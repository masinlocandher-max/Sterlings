/* Browser interface. No server submission, tracking, or stored contact details. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const pricing = window.SterlingsPricing;
  const model = window.SterlingsEstimate;
  if (!pricing || !model) { $('estimate-load-error').hidden = false; return; }
  const storageKey = 'sterlings-website-estimate-v1';
  const form = $('estimate-form');
  let state = model.normalize(model.defaults);
  let announcementTimer;
  const make = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  function addChoice(container, group, value, label, description, price, checkbox = false) {
    const wrapper = make('label', 'choice-card');
    const input = document.createElement('input');
    input.type = checkbox ? 'checkbox' : 'radio'; input.name = group; input.value = value;
    const content = make('span', 'choice-card-content');
    const title = make('span', 'choice-card-title');
    title.append(make('span', '', label));
    const marker = make('span', 'choice-marker'); marker.setAttribute('aria-hidden', 'true'); title.append(marker);
    content.append(title, make('span', 'choice-card-description', description));
    if (price) content.append(make('span', 'choice-card-price', price));
    wrapper.append(input, content); $(container).append(wrapper);
  }
  function addOptions(id, options) {
    for (const [value, option] of Object.entries(options)) {
      const node = document.createElement('option'); node.value = value;
      node.textContent = typeof option === 'string' ? option : option.label;
      $(id).append(node);
    }
  }
  for (const [key, type] of Object.entries(pricing.types)) addChoice('type-options', 'type', key, type.label, type.description);
  addChoice('service-options', 'service', 'build', 'Build my website', 'A project built around your needs. Ongoing care is optional.', 'One-time project + optional care');
  addChoice('service-options', 'service', 'rental', 'Explore website rental', 'A lower starting cost with a recurring arrangement to discuss.', 'Setup + monthly rental');
  addChoice('design-options', 'design', 'tailored', 'Tailored starting layout', 'A starting design adapted to your brand, content and colors.', 'Included in starting scope');
  addChoice('design-options', 'design', 'bespoke', 'Bespoke visual direction', 'A distinct design direction and custom page layouts.', '+' + model.formatRange(pricing.designs.bespoke.setup));
  for (const [key, feature] of Object.entries(pricing.features)) {
    const price = feature.custom ? 'Quoted separately' : '+' + model.formatRange(feature.setup || feature.perPage) + (feature.perPage ? ' per page' : ' one-time');
    addChoice('feature-options', 'features', key, feature.label, feature.description, price, true);
  }
  for (let count = 1; count <= 21; count++) {
    const option = document.createElement('option'); option.value = String(count);
    option.textContent = count === 21 ? 'More than 20 — custom scope' : count + (count === 1 ? ' page' : ' pages'); $('pages').append(option);
  }
  addOptions('content', pricing.contents); addOptions('care', pricing.care);
  addOptions('domain', pricing.domains); addOptions('timeline', pricing.timelines);

  const params = new URLSearchParams(location.search);
  const isShared = Object.keys(model.defaults).some(key => params.has(key));
  try {
    if (isShared) state = model.fromSearch(location.search);
    else {
      const stored = JSON.parse(localStorage.getItem(storageKey) || 'null');
      if (stored && stored.version === 1 && stored.choices) {
        state = model.normalize(stored.choices);
        $('save-status').textContent = 'Your saved choices were restored on this device. Prices always use the current rate card.';
      }
    }
  } catch { /* Storage is optional. The calculator works without it. */ }

  function writeForm() {
    for (const input of form.querySelectorAll('input')) {
      input.checked = input.name === 'features' ? state.features.includes(input.value) : state[input.name] === input.value;
      if (input.name === 'features') {
        const required = (pricing.types[state.type].features || []).includes(input.value);
        input.disabled = required;
        input.closest('label').title = required ? 'Required for this website type. Change the type to remove it.' : '';
      }
    }
    for (const select of form.querySelectorAll('select')) select.value = String(state[select.name]);
    $('care-field').hidden = state.service === 'rental';
    $('care').disabled = state.service === 'rental';
    $('rental-care').hidden = state.service !== 'rental';
  }
  function fillList(id, values) {
    $(id).replaceChildren(...values.map(text => make('li', '', text)));
  }
  const chosenURL = () => {
    const url = new URL('estimate.html', location.href);
    url.search = model.toSearch(state); url.hash = '';
    return url.href;
  };
  function contactDetails() {
    return { name: $('quote-name').value.trim().slice(0, 100), email: $('quote-email').value.trim().slice(0, 254), notes: $('quote-notes').value.trim().slice(0, 600) };
  }
  function requestText() {
    const contact = contactDetails();
    return 'To: ' + pricing.inbox + '\nSubject: Website quotation request — ' + pricing.types[state.type].label + '\n\nHello The Sterlings,\n\nPlease review the website requirements below and prepare a formal quotation.\n\nName: ' + contact.name + '\nReply-to email: ' + contact.email + (contact.notes ? '\nProject notes: ' + contact.notes : '') + '\n\n' + model.report(state) + '\n\nChoices: ' + chosenURL();
  }
  function mailto() {
    const contact = contactDetails(); const result = model.calculate(state);
    const body = [
      'Hello The Sterlings,', '', 'Please review my website needs and prepare a formal quotation.',
      'Name: ' + contact.name, 'Reply-to email: ' + contact.email,
      contact.notes ? 'Notes: ' + contact.notes : '', '',
      pricing.status === 'proposed' ? 'PRICING PREVIEW — proposed rates, not an offer.' : 'Indicative estimate, not a final quotation.',
      pricing.types[state.type].label + ' / ' + pricing.services[state.service].label,
      'Pages: ' + (state.pages > 20 ? 'More than 20' : state.pages),
      'Design: ' + pricing.designs[state.design].label,
      'Content: ' + pricing.contents[state.content].label,
      'Features: ' + (state.features.map(key => pricing.features[key].label).join(', ') || 'None selected'),
      'Care: ' + (state.service === 'rental' ? 'Technical care in proposed rental range' : pricing.care[state.care].label),
      'Domain: ' + pricing.domains[state.domain], 'Timing: ' + pricing.timelines[state.timeline],
      (result.partial ? 'Priced portion only — ' : '') + 'Setup: ' + model.formatRange(result.setup) + '; monthly: ' + model.formatRange(result.monthly),
      'First 12 months: ' + model.formatRange(result.firstYear) + ' (setup + 12 months; not a contract term).',
      result.custom.length ? 'Separate quote needed: ' + result.custom.join('; ') : '',
      'Domain costs, third-party fees, applicable taxes and out-of-scope work excluded. Hosting is separate for a one-time build.',
      'Full selections and breakdown: ' + chosenURL(), 'Rate card: ' + pricing.version
    ].filter(line => line !== null).join('\n');
    return 'mailto:' + pricing.inbox + '?subject=' + encodeURIComponent('Website quotation request — ' + pricing.types[state.type].label) + '&body=' + encodeURIComponent(body);
  }
  function refreshRequest() {
    $('request-text').value = requestText();
    $('open-quotation-email').href = mailto();
    const contact = contactDetails();
    $('print-content').textContent = model.report(state) + (contact.name || contact.email || contact.notes ? '\n\nPROJECT DETAILS\n' + [contact.name, contact.email, contact.notes].filter(Boolean).join('\n') : '');
  }
  function render(announce = false) {
    const result = model.calculate(state);
    $('pricing-preview').hidden = result.status !== 'proposed';
    $('summary-status').textContent = result.status === 'proposed' ? 'PROPOSED ESTIMATE / REVIEW PREVIEW' : 'YOUR INDICATIVE ESTIMATE';
    $('summary-scope').textContent = pricing.types[state.type].label + ' · ' + (state.pages > 20 ? '20+ pages' : state.pages + (state.pages === 1 ? ' page' : ' pages')) + ' · ' + pricing.services[state.service].label;
    $('setup-label').textContent = result.partial ? 'One-time setup · priced portion' : 'One-time setup';
    $('setup-total').textContent = model.formatRange(result.setup);
    $('monthly-total').textContent = result.monthly[1] ? model.formatRange(result.monthly) + ' / mo' : 'No monthly service selected';
    $('monthly-note').textContent = result.monthly[1] ? 'Recurring service, separate from setup.' : 'Hosting, domain renewals and external costs are separate.';
    $('year-total').textContent = model.formatRange(result.firstYear) + (result.partial ? ' + custom work' : '');
    $('custom-notice').hidden = !result.partial; fillList('custom-list', result.custom);
    $('cost-breakdown').replaceChildren(...result.items.map(item => {
      const row = make('li'); row.append(make('span', '', item.label));
      const amounts = make('span', '', item.setup[1] ? model.formatRange(item.setup) : 'No setup charge');
      if (item.monthly[1]) amounts.append(make('small', '', model.formatRange(item.monthly) + ' / mo'));
      row.append(amounts); return row;
    }));
    fillList('assumption-list', result.assumptions); fillList('exclusion-list', result.exclusions);
    $('rate-version').textContent = 'PHP · Rate card ' + result.version;
    $('quote-mini').textContent = (result.status === 'proposed' ? 'Proposed rates. ' : '') + (result.partial ? 'Priced portion: ' : '') + model.formatRange(result.setup) + ' setup' + (result.monthly[1] ? ' + ' + model.formatRange(result.monthly) + '/month' : '') + (result.partial ? '. Custom work is additional.' : '. Subject to a formal quotation.');
    $('mobile-price-label').textContent = (result.status === 'proposed' ? 'Proposed' : 'Estimated') + (result.partial ? ' setup · partial' : ' setup');
    $('mobile-total').textContent = model.formatRange(result.setup);
    refreshRequest();
    if (announce) {
      clearTimeout(announcementTimer);
      announcementTimer = setTimeout(() => {
        $('estimate-announcement').textContent = 'Estimate updated. ' + (result.partial ? 'Priced portion only. ' : '') + 'Setup ' + model.formatRange(result.setup) + '. Monthly ' + model.formatRange(result.monthly) + (result.partial ? '. Custom work requires a separate quotation.' : '.');
      }, 300);
    }
  }
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('change', event => {
    const data = new FormData(form);
    const previousType = state.type;
    const input = Object.fromEntries(data.entries()); input.features = data.getAll('features');
    if (event.target.name === 'type') {
      input.pages = pricing.types[input.type].pages;
      input.features = input.features.filter(feature => !(pricing.types[previousType].features || []).includes(feature));
    }
    state = model.normalize(input); writeForm(); render(true);
    $('save-status').textContent = 'Choices updated. Save again to keep this version on this device.';
  });
  $('save-choices').addEventListener('click', () => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ version: 1, choices: state }));
      $('save-status').textContent = 'Choices saved on this device. Contact details and project notes are not saved.';
    } catch { $('save-status').textContent = 'This browser could not save your choices. Use “Copy a link to these choices” or download the summary.'; }
  });
  $('reset-estimate').addEventListener('click', () => {
    state = model.normalize(model.defaults);
    try { localStorage.removeItem(storageKey); } catch { /* Best effort; report below. */ }
    let cleared = true;
    try { cleared = !localStorage.getItem(storageKey); } catch { cleared = false; }
    history.replaceState(null, '', location.pathname);
    $('quote-request-form').reset(); $('open-quotation-email').hidden = true;
    $('quote-status').textContent = ''; $('estimate-action-status').textContent = '';
    writeForm(); render(true);
    $('save-status').textContent = cleared ? 'Started again. Saved choices and contact fields were cleared.' : 'Started again in this tab. Your browser could not confirm removal of a previously saved draft.';
  });
  async function copyOrShow(text, statusId, successMessage) {
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text); $(statusId).textContent = successMessage;
    } catch {
      $('manual-copy-text').value = text; $('manual-copy').hidden = false;
      $('manual-copy').scrollIntoView({ behavior: 'auto', block: 'center' });
      $('manual-copy-text').focus(); $('manual-copy-text').select();
      $(statusId).textContent = 'Automatic copying is unavailable. The text is shown below; select and copy it manually.';
    }
  }
  $('close-manual-copy').addEventListener('click', () => { $('manual-copy').hidden = true; $('share-estimate').focus(); });
  $('share-estimate').addEventListener('click', () => copyOrShow(chosenURL(), 'estimate-action-status', 'Link copied. It includes your choices only, not your contact details or notes.'));
  $('copy-request').addEventListener('click', () => copyOrShow(requestText(), 'quote-status', 'Request copied. Paste it into an email to ' + pricing.inbox + ' and send it when ready.'));
  $('print-estimate').addEventListener('click', () => { refreshRequest(); window.print(); });
  window.addEventListener('beforeprint', refreshRequest);
  $('download-estimate').addEventListener('click', () => {
    const blob = new Blob([model.report(state)], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob); const link = document.createElement('a');
    link.href = url; link.download = 'The-Sterlings-Website-Estimate.txt'; document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    $('estimate-action-status').textContent = 'Your summary download was requested. It contains your selections and the pricing status.';
  });
  const openEmail = make('a', 'button button-dark', 'Open my email app');
  openEmail.id = 'open-quotation-email'; openEmail.hidden = true;
  $('quote-status').insertAdjacentElement('afterend', openEmail);
  $('quote-request-form').addEventListener('input', () => { openEmail.hidden = true; $('quote-status').textContent = ''; refreshRequest(); });
  $('quote-request-form').addEventListener('submit', event => {
    event.preventDefault();
    if (!$('quote-name').value.trim()) { $('quote-name').setCustomValidity('Please enter your name.'); $('quote-name').reportValidity(); return; }
    if (!$('quote-request-form').reportValidity()) return;
    refreshRequest(); openEmail.hidden = false;
    $('quote-status').textContent = 'Your draft is ready. Open your email app, review it and press Send there. Nothing has been sent by this page. You can also copy the full request.';
    openEmail.focus();
  });
  $('quote-name').addEventListener('input', () => $('quote-name').setCustomValidity(''));
  writeForm(); render();
  for (const id of ['estimator', 'estimate-basis', 'request-quote', 'mobile-estimate-bar']) $(id).hidden = false;
})();

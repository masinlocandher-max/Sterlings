/* Pure calculations shared by the page and Node's built-in test runner. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(require('./estimate-pricing.js'));
  else root.SterlingsEstimate = factory(root.SterlingsPricing);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (pricing) {
  'use strict';
  const defaults = { type: 'landing', service: 'build', pages: 1, design: 'tailored', content: 'ready', care: 'none', features: [], domain: 'existing', timeline: 'flexible' };
  const own = (object, key) => typeof key === 'string' && Object.prototype.hasOwnProperty.call(object, key);
  const choose = (object, key, fallback) => own(object, key) ? key : fallback;
  function normalize(input = {}) {
    if (!input || typeof input !== 'object') input = {};
    const number = Number(input.pages);
    const state = {
      type: choose(pricing.types, input.type, defaults.type),
      service: choose(pricing.services, input.service, defaults.service),
      pages: Number.isInteger(number) && number >= 1 && number <= 21 ? number : defaults.pages,
      design: choose(pricing.designs, input.design, defaults.design),
      content: choose(pricing.contents, input.content, defaults.content),
      care: choose(pricing.care, input.care, defaults.care),
      features: Array.isArray(input.features) ? Object.keys(pricing.features).filter(key => input.features.includes(key)) : [],
      domain: choose(pricing.domains, input.domain, defaults.domain),
      timeline: choose(pricing.timelines, input.timeline, defaults.timeline)
    };
    // Do not charge optional care on top of the rental service's technical care.
    if (state.service === 'rental') state.care = 'none';
    // Required custom work cannot disappear by editing a shared URL.
    for (const feature of pricing.types[state.type].features || []) {
      if (!state.features.includes(feature)) state.features.push(feature);
    }
    state.features = Object.keys(pricing.features).filter(key => state.features.includes(key));
    return state;
  }
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const multiply = (range, count) => range.map(value => value * count);
  const formatMoney = value => new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(value);
  const formatRange = range => range[0] === range[1] ? formatMoney(range[0]) : formatMoney(range[0]) + '–' + formatMoney(range[1]);
  function calculate(input) {
    const state = normalize(input);
    const service = pricing.services[state.service];
    const custom = [];
    const items = [];
    const addItem = (label, setup = [0, 0], monthly = [0, 0]) => items.push({ label, setup: [...setup], monthly: [...monthly] });
    addItem(state.service === 'rental' ? 'Rental setup · 1 page' : 'Website design & build · 1 page', service.setup, service.monthly);
    if (state.pages > 20) {
      custom.push('Page count and full build scope for more than 20 pages');
    } else if (state.pages > 1) {
      addItem((state.pages - 1) + ' additional ' + (state.pages === 2 ? 'page' : 'pages'), multiply(pricing.additionalPage, state.pages - 1));
    }
    if (state.design !== 'tailored') addItem(pricing.designs[state.design].label, pricing.designs[state.design].setup);
    if (state.content !== 'ready') {
      if (state.pages > 20) custom.push(pricing.contents[state.content].label + ' — page count to confirm');
      else addItem(pricing.contents[state.content].label + ' · ' + state.pages + ' pages', multiply(pricing.contents[state.content].perPage, state.pages));
    }
    for (const key of state.features) {
      const feature = pricing.features[key];
      if (feature.custom) custom.push(feature.label);
      else if (feature.perPage && state.pages > 20) custom.push(feature.label + ' — page count to confirm');
      else addItem(feature.label, feature.perPage ? multiply(feature.perPage, state.pages) : feature.setup);
    }
    if (state.service === 'build' && state.care !== 'none') addItem(pricing.care[state.care].label, [0, 0], pricing.care[state.care].monthly);
    const setup = items.reduce((total, item) => add(total, item.setup), [0, 0]);
    const monthly = items.reduce((total, item) => add(total, item.monthly), [0, 0]);
    if (state.timeline === 'urgent') custom.push('Rush feasibility, launch date and any rush charge');
    const exclusions = [
      'Domain registration and renewals, including an existing domain’s renewal costs.',
      'Third-party subscriptions, paid themes or assets, payment fees and any applicable taxes.',
      'Photography, branding, translation and any work outside the selected scope.'
    ];
    if (state.service === 'build') exclusions.push('Hosting and publishing arrangements; these are confirmed separately.');
    if (state.service === 'rental') exclusions.push('Rental term, ownership, hosting limits and support scope require an agreement.');
    const assumptions = [
      'Starting layout, mobile adaptation, basic page titles and descriptions, and contact links.',
      'Content, branding and images supplied by you unless copy help is selected.',
      'Feature availability and integration requirements are reviewed before any formal quotation.',
      state.service === 'rental' ? 'The proposed rental range allows for standard hosting and routine technical care; limits are subject to agreement.' : 'Technical care does not include content updates unless that option is selected.'
    ];
    return { state, items, setup, monthly, firstYear: add(setup, multiply(monthly, 12)), custom, exclusions, assumptions, partial: custom.length > 0, status: pricing.status, version: pricing.version };
  }
  function fromSearch(search) {
    const params = new URLSearchParams(String(search).slice(0, 3000));
    const input = {};
    for (const key of Object.keys(defaults)) if (params.has(key)) input[key] = params.get(key);
    if (typeof input.features === 'string') input.features = input.features.split(',');
    return normalize(input);
  }
  function toSearch(input) {
    const state = normalize(input);
    const params = new URLSearchParams();
    for (const key of Object.keys(defaults)) params.set(key, Array.isArray(state[key]) ? state[key].join(',') : String(state[key]));
    return params.toString();
  }
  function report(input, date = new Date()) {
    const result = calculate(input);
    const s = result.state;
    const status = pricing.status === 'proposed' ? 'PRICING PREVIEW — PROPOSED RATES, NOT AN OFFER' : 'INDICATIVE WEBSITE ESTIMATE — NOT A FINAL QUOTATION';
    const lines = [
      'THE STERLINGS', 'Digital Spaces, Thoughtfully Made.', '', status,
      'Prepared: ' + date.toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Manila' }),
      'Rate card: ' + pricing.version, '', 'YOUR WEBSITE',
      pricing.types[s.type].label + ' · ' + pricing.services[s.service].label,
      'Pages: ' + (s.pages > 20 ? 'More than 20 (scope review required)' : s.pages),
      'Design: ' + pricing.designs[s.design].label,
      'Content: ' + pricing.contents[s.content].label,
      'Features: ' + (s.features.map(key => pricing.features[key].label).join(', ') || 'No optional features'),
      'Care: ' + (s.service === 'rental' ? 'Routine technical care allowed for in rental range' : pricing.care[s.care].label),
      'Domain: ' + pricing.domains[s.domain], 'Timing: ' + pricing.timelines[s.timeline], '',
      result.partial ? 'PRICED PORTION ONLY — CUSTOM WORK IS ADDITIONAL' : 'ESTIMATED BUDGET',
      'One-time setup: ' + formatRange(result.setup),
      'Monthly: ' + formatRange(result.monthly) + (result.monthly[1] === 0 ? ' (no recurring service selected; external costs excluded)' : ''),
      'First 12 months: ' + formatRange(result.firstYear),
      'First-year illustration = setup + 12 monthly payments, not a contract term or payment schedule.',
      '', 'ITEMIZED BREAKDOWN'
    ];
    for (const item of result.items) lines.push('- ' + item.label + ': ' + formatRange(item.setup) + ' one-time' + (item.monthly[1] ? '; ' + formatRange(item.monthly) + '/month' : ''));
    if (result.custom.length) lines.push('', 'REQUIRES A SEPARATE QUOTATION', ...result.custom.map(value => '- ' + value), 'These costs are not included in the displayed totals.');
    lines.push('', 'BASIS OF THIS ESTIMATE', ...result.assumptions.map(value => '- ' + value), '', 'NOT INCLUDED / TO CONFIRM', ...result.exclusions.map(value => '- ' + value), '', 'No order, payment, reservation or service agreement is created by this estimate. A formal quotation follows scope and availability review.', '', 'Contact: ' + pricing.inbox);
    return lines.join('\n');
  }
  return { defaults, normalize, calculate, formatMoney, formatRange, fromSearch, toSearch, report };
});

/* THE STERLINGS — progressive enhancement, no tracking scripts */
(() => {
  'use strict';
  const emailForInquiries = 'fmbandco@gmail.com'; // Interim business inbox; replace with verified Sterlings inbox before official domain launch.
  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.getElementById('mobile-navigation');
  const menuBackdrop = document.querySelector('.menu-backdrop');
  const dropdown = document.querySelector('[data-nav-dropdown]');
  const dropdownToggle = dropdown && dropdown.querySelector('.nav-dropdown-toggle');
  const dropdownPanel = document.getElementById('solutions-dropdown');
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const closeDropdown = (returnFocus = false) => {
    if (!dropdownPanel || !dropdownToggle) return;
    const wasOpen = !dropdownPanel.hidden;
    dropdownPanel.hidden = true;
    dropdownToggle.setAttribute('aria-expanded', 'false');
    dropdown.classList.remove('is-open');
    if (returnFocus && wasOpen) dropdownToggle.focus();
  };

  if (dropdownToggle && dropdownPanel) {
    dropdownToggle.addEventListener('click', event => {
      event.stopPropagation();
      const willOpen = dropdownPanel.hidden;
      closeDropdown();
      dropdownPanel.hidden = !willOpen;
      dropdown.classList.toggle('is-open', willOpen);
      dropdownToggle.setAttribute('aria-expanded', String(willOpen));
    });
    dropdownPanel.querySelectorAll('a').forEach(link =>
      link.addEventListener('click', () => closeDropdown()));
    document.addEventListener('pointerdown', event => {
      if (!dropdown.contains(event.target)) closeDropdown();
    });
  }

  if (menuButton && mobileNav && menuBackdrop) {
    let previousFocus = null;
    const mobileOpen = () => !mobileNav.hidden;
    const setMobileOpen = (open, restoreFocus = false) => {
      if (open) {
        closeDropdown();
        previousFocus = document.activeElement;
      }
      mobileNav.hidden = !open;
      menuBackdrop.hidden = !open;
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      document.body.classList.toggle('menu-open', open);
      document.documentElement.classList.toggle('menu-open', open);
      if (open) {
        const firstLink = mobileNav.querySelector('a');
        if (firstLink) firstLink.focus({preventScroll:true});
      } else if (restoreFocus) {
        (previousFocus instanceof HTMLElement ? previousFocus : menuButton).focus({preventScroll:true});
      }
    };
    menuButton.addEventListener('click', () => setMobileOpen(!mobileOpen(), false));
    menuBackdrop.addEventListener('click', () => setMobileOpen(false, true));
    mobileNav.querySelectorAll('a').forEach(link =>
      link.addEventListener('click', () => setMobileOpen(false, false)));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 920 && mobileOpen()) setMobileOpen(false, false);
      if (window.innerWidth <= 920) closeDropdown();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        if (mobileOpen()) {setMobileOpen(false, true);event.preventDefault();}
        else if (dropdownPanel && !dropdownPanel.hidden) {closeDropdown(true);event.preventDefault();}
        return;
      }
      if (event.key === 'Tab' && mobileOpen()) {
        const focusables = [menuButton, ...mobileNav.querySelectorAll('a')].filter(el => el.offsetParent !== null);
        if (!focusables.length) return;
        const first = focusables[0], last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          last.focus(); event.preventDefault();
        } else if (!event.shiftKey && document.activeElement === last) {
          first.focus(); event.preventDefault();
        }
      }
    });
  } else {
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeDropdown(true);
    });
  }
  const bar = document.querySelector('.scroll-indicator');
  if (bar) {
    let scheduled = false;
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? Math.min(100,window.scrollY / max * 100) : 0) + '%';
      scheduled = false;
    };
    window.addEventListener('scroll', () => { if (!scheduled) { scheduled=true; requestAnimationFrame(updateProgress); } },{passive:true});
    updateProgress();
  }
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) {entry.target.classList.add('visible');observer.unobserve(entry.target);} });
    },{threshold:.08,rootMargin:'0px 0px -25px 0px'});
    reveals.forEach(el => observer.observe(el));
  } else reveals.forEach(el => el.classList.add('visible'));
  const serviceField = document.getElementById('inquiry-service');
  const conceptNames = {
    atelier: 'Morrow Atelier (the design studio)',
    residence: 'Casa Solenne (the beach resort)',
    business: 'Northline Partners (the business advisor)',
    portfolio: 'Isla Frames (the photographer)'
  };
  const showroomChoice = new URLSearchParams(window.location.search).get('showroom');
  if (showroomChoice && Object.prototype.hasOwnProperty.call(conceptNames, showroomChoice)) {
    const messageField = document.getElementById('inquiry-message');
    if (serviceField) serviceField.value = 'Make it for me (Sterling Concierge)';
    if (messageField && !messageField.value.trim()) {
      messageField.value = 'I saw the ' + conceptNames[showroomChoice] + ' sample in The Sterlings Showroom. Could you make something like it for me?';
    }
  }

  document.querySelectorAll('[data-service]').forEach(link => {
    link.addEventListener('click',()=>{ if(serviceField) serviceField.value = link.dataset.service; });
  });
  const form = document.getElementById('inquiry-form');
  const status = document.getElementById('inquiry-status');
  if (form && status) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const name = String(data.get('name')||'').trim().slice(0,120);
      const from = String(data.get('email')||'').trim().slice(0,254);
      const service = String(data.get('service')||'').trim().slice(0,120);
      const message = String(data.get('message')||'').trim().slice(0,1300);
      const subject = 'The Sterlings inquiry: ' + service;
      const body = 'Hello The Sterlings,\n\nI would like to inquire about ' + service + '.\n\nName: ' + name + '\nReply-to email: ' + from + '\n\nAbout my project:\n' + message + '\n\nThank you.';
      const url = 'mailto:' + emailForInquiries + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      window.location.href = url;
      status.textContent = 'Your email app should open with your message. Check it, then press Send. If nothing opens, use the Copy button below.';
      let copy = document.getElementById('copy-inquiry');
      if (!copy) {
        copy = document.createElement('button');
        copy.id = 'copy-inquiry';
        copy.type = 'button';
        copy.className = 'button button-outline';
        copy.style.marginTop = '12px';
        status.insertAdjacentElement('afterend',copy);
      }
      copy.textContent = 'Copy my message';
      copy.onclick = async () => {
        try { await navigator.clipboard.writeText('To: ' + emailForInquiries + '\nSubject: ' + subject + '\n\n' + body);copy.textContent='Copied. Paste it into an email to us'; }
        catch { copy.textContent = 'Please copy the message from your email app'; }
      };
    });
  }
})();
// Certificate of Inheritance: the visitor types a name, the certificate fills in,
// and "Claim your website" carries the name into the contact form.
(() => {
  const form = document.getElementById('heir-form');
  const input = document.getElementById('heir-name');
  const nameEl = document.getElementById('cert-name');
  const domainEl = document.getElementById('cert-domain');
  if (!form || !input || !nameEl || !domainEl) return;
  const toDomain = value => {
    const slug = value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 24);
    return (slug || 'yourname') + '.com';
  };
  const update = () => {
    const value = input.value.trim().replace(/\s+/g, ' ');
    nameEl.textContent = value || 'Your Name';
    domainEl.textContent = toDomain(value);
    nameEl.classList.toggle('is-filled', Boolean(value));
  };
  input.addEventListener('input', update);
  form.addEventListener('submit', event => {
    event.preventDefault();
    const value = input.value.trim();
    const nameField = document.getElementById('inquiry-name');
    const messageField = document.getElementById('inquiry-message');
    if (nameField && value) nameField.value = value;
    if (messageField && value && !messageField.value.trim()) {
      messageField.value = 'I’d like to claim my website, ' + toDomain(value) + ' (or something close to it).';
    }
    const contact = document.getElementById('contact');
    if (contact) contact.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    const next = document.getElementById(value ? 'inquiry-email' : 'inquiry-name');
    if (next) setTimeout(() => next.focus({ preventScroll: true }), 500);
  });
})();

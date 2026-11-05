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
    atelier: 'Morrow Atelier — creative practice',
    residence: 'Casa Solenne — hospitality',
    business: 'Northline Partners — professional services',
    portfolio: 'Isla Frames — personal portfolio'
  };
  const showroomChoice = new URLSearchParams(window.location.search).get('showroom');
  if (showroomChoice && Object.prototype.hasOwnProperty.call(conceptNames, showroomChoice)) {
    const messageField = document.getElementById('inquiry-message');
    if (serviceField) serviceField.value = 'Managed website';
    if (messageField && !messageField.value.trim()) {
      messageField.value = 'I would like to discuss a website inspired by the ' + conceptNames[showroomChoice] + ' concept in The Sterlings Showroom. Please share the options for customizing a similar direction for my business.';
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
      status.textContent = 'Your email app should open with your inquiry. Review it and press Send there. If nothing opens, use the Copy inquiry button below.';
      let copy = document.getElementById('copy-inquiry');
      if (!copy) {
        copy = document.createElement('button');
        copy.id = 'copy-inquiry';
        copy.type = 'button';
        copy.className = 'button button-outline';
        copy.style.marginTop = '12px';
        status.insertAdjacentElement('afterend',copy);
      }
      copy.textContent = 'Copy inquiry details';
      copy.onclick = async () => {
        try { await navigator.clipboard.writeText('To: ' + emailForInquiries + '\nSubject: ' + subject + '\n\n' + body);copy.textContent='Copied — paste into your email'; }
        catch { copy.textContent = 'Please copy the details from your email draft'; }
      };
    });
  }
})();
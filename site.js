/* THE STERLINGS — progressive enhancement, no tracking scripts */
(() => {
  'use strict';
  const emailForInquiries = 'fmbandco@gmail.com'; // Interim business inbox; replace with verified Sterlings inbox before official domain launch.
  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.getElementById('mobile-navigation');
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
  if (menuButton && mobileNav) {
    const close = () => { menuButton.setAttribute('aria-expanded', 'false');menuButton.setAttribute('aria-label','Open menu');mobileNav.hidden = true; };
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      mobileNav.hidden = !open;
    });
    mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click',close));
    window.addEventListener('keydown', event => { if(event.key === 'Escape') close(); });
    window.addEventListener('resize', () => { if(window.innerWidth > 920)close(); });
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
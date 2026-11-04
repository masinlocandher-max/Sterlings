/* Sterling Group — site behaviour */

// TODO: replace with the confirmed Sterling Group inquiry address before launch.
const INQUIRY_EMAIL = 'hello@example.com';

document.documentElement.classList.remove('no-js');

// Year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Nav: background on scroll + mobile menu
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav__toggle');

const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

const setMenu = (open) => {
  nav.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
};
toggle.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
document.querySelectorAll('.nav__menu a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
    io.observe(el);
  });
} else {
  reveals.forEach((el) => el.classList.add('is-visible'));
}

// Service path: hero / pricing buttons preselect the path in the form
const form = document.getElementById('inquiry');
const status = form.querySelector('.form__status');
const submitBtn = form.querySelector('button[type=submit]');
const beginCopy = document.querySelector('.begin__copy');

const applyPath = (path) => {
  const radio = form.querySelector(`input[name=path][value=${path}]`);
  if (radio) radio.checked = true;
  submitBtn.textContent = submitBtn.dataset[`label${path[0].toUpperCase()}${path.slice(1)}`];
  beginCopy.textContent = beginCopy.dataset[`copy${path[0].toUpperCase()}${path.slice(1)}`];
};
form.querySelectorAll('input[name=path]').forEach((r) => r.addEventListener('change', () => applyPath(r.value)));
document.querySelectorAll('[data-path]').forEach((a) => a.addEventListener('click', () => applyPath(a.dataset.path)));

// Inquiry form — validates, then opens the visitor's email app with a prepared message.
// Swap this for a form service or your own endpoint when one is chosen.
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let firstInvalid = null;

  form.querySelectorAll('.field').forEach((field) => {
    const inputs = Array.from(field.querySelectorAll('input, textarea'));
    const ok = inputs[0].type === 'radio'
      ? inputs.some((el) => el.checked)
      : inputs.every((el) => el.value.trim() && el.checkValidity());
    field.classList.toggle('is-invalid', !ok);
    if (!ok && !firstInvalid) firstInvalid = inputs[0];
  });

  if (firstInvalid) {
    status.textContent = 'Please complete each field so we can get to know you.';
    firstInvalid.focus();
    return;
  }

  const data = new FormData(form);
  const isStudio = data.get('path') === 'studio';
  const subject = isStudio
    ? `Studio early access — ${data.get('space')}`
    : `Concierge proposal request — ${data.get('space')}`;
  const body = [
    `Service: ${isStudio ? 'Sterling Studio (self-service, early access)' : 'Sterling Concierge (managed)'}`,
    `Name: ${data.get('name')}`,
    `Email: ${data.get('email')}`,
    `Building: ${data.get('space')}`,
    '',
    data.get('message'),
  ].join('\n');

  window.location.href = `mailto:${INQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  status.textContent = 'Thank you. Your email app should open with your message ready to send.';
});

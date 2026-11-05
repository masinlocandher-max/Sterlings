/* THE STERLINGS — Showroom controls (fictional examples, not client work) */
(() => {
  'use strict';
  const concepts = {
    atelier: { title:'Morrow Atelier', description:'An editorial creative practice' },
    residence: { title:'Casa Solenne', description:'An intimate hospitality escape' },
    business: { title:'Northline Partners', description:'A confident professional presence' },
    portfolio: { title:'Isla Frames', description:'A photographic storytelling portfolio' }
  };
  const selector = [...document.querySelectorAll('[data-concept]')];
  const devices = [...document.querySelectorAll('[data-device]')];
  const frame = document.getElementById('concept-frame');
  const stage = document.getElementById('viewer-stage');
  const title = document.getElementById('viewer-title');
  const description = document.getElementById('viewer-description');
  const fullLink = document.getElementById('viewer-open-link');
  if (!selector.length || !frame || !stage || !title || !fullLink) return;

  function chooseConcept(id, push = true) {
    if (!Object.prototype.hasOwnProperty.call(concepts,id)) return;
    const concept = concepts[id];
    const page = 'showroom-preview.html?space=' + encodeURIComponent(id);
    title.textContent = concept.title;
    if (description) description.textContent=concept.description;
    frame.title = concept.title + ' concept website preview';
    stage.setAttribute('aria-busy','true');
    frame.src = page;
    fullLink.href = page;
    selector.forEach(button => {
      const active = button.dataset.concept === id;
      button.classList.toggle('is-selected',active);
      button.setAttribute('aria-pressed',String(active));
    });
    if (push && window.history && window.history.replaceState) {
      const url = new URL(window.location.href);
      url.searchParams.set('concept',id);
      window.history.replaceState(null,'',url.pathname+url.search+url.hash);
    }
  }

  selector.forEach((button,index) => {
    button.addEventListener('click',()=>chooseConcept(button.dataset.concept));
    button.addEventListener('keydown',event=>{
      if (!['ArrowDown','ArrowUp','ArrowRight','ArrowLeft'].includes(event.key)) return;
      event.preventDefault();
      const direction = ['ArrowDown','ArrowRight'].includes(event.key)?1:-1;
      const next=selector[(index+direction+selector.length)%selector.length];
      next.focus();
      chooseConcept(next.dataset.concept);
    });
  });
  frame.addEventListener('load',()=>stage.removeAttribute('aria-busy'));
  devices.forEach(button=>button.addEventListener('click',()=>{
    const device=button.dataset.device;
    stage.dataset.device=device;
    devices.forEach(control=>{
      const isActive=control.dataset.device===device;
      control.classList.toggle('is-active',isActive);
      control.setAttribute('aria-pressed',String(isActive));
    });
  }));
  const query=new URLSearchParams(window.location.search);
  const initial=query.get('concept')||'atelier';
  chooseConcept(Object.prototype.hasOwnProperty.call(concepts,initial)?initial:'atelier',false);
})();
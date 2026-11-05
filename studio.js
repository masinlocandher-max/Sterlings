/* THE STERLINGS STUDIO — a local-first website editor. No server, account or publishing is implied. */
(() => {
  'use strict';
  const STORE_KEY = 'sterlings.studio.draft.v1';
  const inquiryInbox = 'fmbandco@gmail.com'; // Interim owner-controlled business inbox.
  const templates = {
    studio: {
      siteName:'Aurora Studio',headline:'Good work deserves a place of its own.',
      tagline:'Independent design and thoughtful collaboration.',
      cta:'Explore my work',
      about:"We're a creative practice making clear, memorable work for good people.",
      services:'Brand identity\nCreative direction\nDigital experiences',
      accent:'#8a7a67',photo:'',email:'',location:''
    },
    portfolio: {
      siteName:'A Personal Portfolio',headline:'A little about me. A lot about what I make.',
      tagline:'Selected work, stories, and the ideas in between.',
      cta:'Get in touch',
      about:"I make thoughtful work that connects people, places, and possibilities.",
      services:'Creative work\nSelected projects\nCollaborations',
      accent:'#736f61',photo:'',email:'',location:''
    },
    business: {
      siteName:'Your Neighborhood Studio',headline:'Made with care. Right here for you.',
      tagline:'A welcoming local business built around personal service.',
      cta:'Contact our team',
      about:"We believe the little details make all the difference. We'd love to help you.",
      services:'Our signature service\nPersonal consultations\nCustom orders',
      accent:'#9a7859',photo:'',email:'',location:''
    }
  };
  const fieldNames = ['siteName','headline','tagline','cta','about','services','accent','photo','email','location'];
  const form = document.getElementById('studio-form');
  const frame = document.getElementById('site-preview');
  if (!form || !frame) return;
  const saveStatus = document.getElementById('save-status');
  const toastEl = document.getElementById('studio-toast');
  const previewOuter = document.getElementById('preview-outer');
  const previewLabel = document.getElementById('preview-site-label');
  const undoButton = document.getElementById('undo-button');
  const redoButton = document.getElementById('redo-button');
  let template = 'studio';
  let state = {...templates.studio};
  let past = [];
  let future = [];
  let beforeFocus = null;
  let renderTimer = null;
  let toastTimer = null;

  function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {toastEl.hidden=true;},4200);
  }
  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  }
  function validColor(value){return /^#[0-9a-fA-F]{6}$/.test(value) ? value : '#8a7a67';}
  function imageUrl(value) {
    try {
      const u = new URL(String(value || ''));
      return u.protocol === 'https:' && !/["'<>\\]/.test(u.href) ? u.href : '';
    } catch {return '';}
  }
  function getImage() {
    const custom = imageUrl(state.photo);
    return custom || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1500&q=84';
  }
  function snapshot(){return JSON.stringify({template,state});}
  function readFields(){
    const next={};
    fieldNames.forEach(name => { next[name] = String((form.elements.namedItem(name) || {}).value || ''); });
    next.accent=validColor(next.accent);
    return next;
  }
  function setFields(){
    fieldNames.forEach(name => {const field=form.elements.namedItem(name);if(field)field.value=state[name] || '';});
    document.getElementById('accent-label').textContent = validColor(state.accent).toUpperCase();
    if(previewLabel) previewLabel.textContent=state.siteName || 'Your website';
    document.querySelectorAll('[data-template]').forEach(button=>button.classList.toggle('is-selected',button.dataset.template===template));
    updateHistoryButtons();
  }
  function updateHistoryButtons(){undoButton.disabled=past.length===0;redoButton.disabled=future.length===0;}
  function save(){
    try {localStorage.setItem(STORE_KEY,snapshot());if(saveStatus)saveStatus.textContent='Draft saved in this browser';}
    catch {if(saveStatus)saveStatus.textContent='Storage unavailable • export to keep your work';}
  }
  function getDocument(){
    const name=esc(state.siteName.trim() || 'Your Studio');
    const headline=esc(state.headline.trim() || 'A place of your own.').replace(/\r?\n/g,'<br>');
    const tagline=esc(state.tagline.trim());
    const cta=esc(state.cta.trim() || 'Get in touch');
    const about=esc(state.about.trim() || 'Welcome to our corner of the internet.').replace(/\r?\n/g,'<br>');
    const services=state.services.split(/\r?\n/).map(x=>x.trim()).filter(Boolean).slice(0,8);
    const servicesHtml=services.length ? services.map((item,i)=>'<article class="service"><span>0'+(i+1)+'</span><h3>'+esc(item)+'</h3><div class="service-arrow">↗</div></article>').join('\n') : '<p>Explore what we have to offer.</p>';
    const color=validColor(state.accent);
    const photo=esc(getImage());
    const location=esc(state.location.trim());
    const address=state.email.trim();
    const validEmail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address);
    const contact=validEmail ? '<a href="mailto:'+esc(address)+'" class="contact-link">Send an email ↗</a>' : '<p class="contact-placeholder">Add your contact email in the editor to enable direct inquiries.</p>';
    const css=[
      '@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600&display=swap");',
      ':root{--accent:'+color+';--ink:#282723;--white:#faf7f2}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;color:var(--ink);background:var(--white);font-family:"DM Sans",Arial,sans-serif}a{text-decoration:none;color:inherit}.wrap{width:min(1100px,calc(100% - 54px));margin:auto}',
      'header{height:86px;display:flex;align-items:center;justify-content:space-between;gap:24px}header .logo{font-size:14px;font-weight:700;letter-spacing:.15em;text-transform:uppercase}nav{display:flex;gap:24px}nav a{font-size:12px;color:#5e584f}nav a:hover{color:var(--accent)}',
      '.hero{min-height:590px;display:flex;align-items:center;position:relative;overflow:hidden;background:linear-gradient(90deg,#f8f1e9 0%,#f9f2ea 48%,transparent 88%)}.hero-photo{position:absolute;right:0;top:0;bottom:0;width:47%;object-fit:cover;filter:saturate(.7);opacity:.86}.hero:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent 43%,rgba(250,247,243,.45) 62%,transparent 83%);pointer-events:none}.hero .wrap{position:relative;z-index:1;padding:100px 0}.eyebrow{font-size:10px;letter-spacing:.2em;font-weight:700;color:var(--accent)}h1,h2,h3{font-family:"Playfair Display",Georgia,serif;font-weight:400;letter-spacing:-.05em}h1{font-size:clamp(43px,5.8vw,80px);max-width:620px;line-height:1.15;margin:20px 0}h1:after{content:"";width:43px;height:3px;display:block;background:var(--accent);margin-top:22px}.lead{max-width:400px;font-size:16px;color:#60594e;line-height:1.85}.button{display:inline-flex;align-items:center;justify-content:center;padding:15px 25px;background:var(--ink);color:#fff;border-radius:4px;font-weight:700;font-size:12px;margin-top:21px}',
      '.section{padding:95px 0}.section-top{display:flex;justify-content:space-between;align-items:end;gap:30px}.section h2{font-size:clamp(36px,4.5vw,55px);margin:10px 0 25px}.about-copy{font-size:17px;color:#6d655d;line-height:1.9;max-width:760px}.services{background:#efebe4}.services-list{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:30px}.service{min-height:160px;padding:24px;border:1px solid #d7ccc0;background:#faf7f2}.service span{font-size:10px;color:var(--accent)}.service h3{font-size:25px}.service-arrow{color:var(--accent);text-align:right}.contact{background:#2e2a25;color:#fff}.contact p{color:#c5bdb3;line-height:1.9}.contact-link{display:inline-block;padding:14px 23px;background:#faf7f2;color:#292622;border-radius:4px;font-size:12px;font-weight:700;margin-top:18px}.contact-placeholder{font-size:12px}footer{padding:22px 0;font-size:10px;color:#867c70;background:#24211e}',
      '@media(max-width:760px){.wrap{width:calc(100% - 38px)}header{height:68px}header .logo{font-size:12px}nav{gap:11px}nav a{font-size:9px}.hero{min-height:620px;align-items:flex-end;background:#f7f0e8}.hero-photo{height:52%;width:100%;left:0;bottom:auto;opacity:.65}.hero:after{background:linear-gradient(0deg,#f7f0e8 20%,rgba(247,240,232,.85) 45%,transparent 70%)}.hero .wrap{padding:235px 0 60px}h1{font-size:43px}.lead{font-size:14px}.section{padding:65px 0}.services-list{grid-template-columns:1fr}.service{min-height:120px}.section h2{font-size:36px}}',
      '@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}}'
    ].join('\n');
    return [
      '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">',
      '<title>'+name+' — Official Website</title><meta name="description" content="'+esc(state.tagline.slice(0,160))+'"><meta name="theme-color" content="'+color+'">',
      '<style>'+css+'</style></head><body>',
      '<header class="wrap"><a class="logo" href="#home">'+name+'</a><nav aria-label="Site navigation"><a href="#about">About</a><a href="#services">Services</a><a href="#contact">Contact</a></nav></header>',
      '<main><section class="hero" id="home"><img class="hero-photo" src="'+photo+'" alt="" fetchpriority="high"><div class="wrap"><p class="eyebrow">WELCOME TO '+name.toUpperCase()+'</p><h1>'+headline+'</h1><p class="lead">'+tagline+'</p><a class="button" href="#contact">'+cta+' &nbsp; ↗</a></div></section>',
      '<section class="section" id="about"><div class="wrap"><p class="eyebrow">A LITTLE ABOUT US</p><h2>Made with purpose.</h2><p class="about-copy">'+about+'</p></div></section>',
      '<section class="section services" id="services"><div class="wrap"><p class="eyebrow">WHAT WE DO</p><h2>Explore our services.</h2><div class="services-list">'+servicesHtml+'</div></div></section>',
      '<section class="section contact" id="contact"><div class="wrap"><p class="eyebrow">GET IN TOUCH</p><h2>Let’s make something happen.</h2><p>'+ (location ? location+'<br>' : '')+'We would love to hear from you.</p>'+contact+'</div></section></main>',
      '<footer><div class="wrap">© '+new Date().getFullYear()+' '+name+'. All rights reserved.</div></footer></body></html>'
    ].join('\n');
  }
  function render() {
    clearTimeout(renderTimer);
    renderTimer = setTimeout(() => {
      frame.srcdoc=getDocument();
      if(previewLabel) previewLabel.textContent=state.siteName || 'Your website';
    },120);
  }
  function pushHistory(previous){
    if(!previous || previous===snapshot())return;
    if(past[past.length-1]!==previous)past.push(previous);
    if(past.length>60)past.shift();
    future=[];updateHistoryButtons();
  }
  function restore(snapshotString){
    try {
      const data=JSON.parse(snapshotString);
      if(!data || !data.state)return;
      template=Object.hasOwn(templates,data.template) ? data.template : 'studio';
      state={...templates[template]};
      fieldNames.forEach(name=>{if(typeof data.state[name]==='string')state[name]=data.state[name].slice(0,name==='about'?900:name==='services'?500:500);});
      state.accent=validColor(state.accent);
      if(state.photo && !imageUrl(state.photo))state.photo='';
      setFields();render();save();
    }catch{toast('Could not restore this draft.');}
  }
  form.addEventListener('focusin', event => {
    if(event.target.matches('input,textarea'))beforeFocus=snapshot();
  });
  form.addEventListener('focusout',event => {
    if(event.target.matches('input,textarea') && beforeFocus){pushHistory(beforeFocus);beforeFocus=null;}
  });
  form.addEventListener('input',()=> {
    state=readFields();
    document.getElementById('accent-label').textContent=validColor(state.accent).toUpperCase();
    render();save();
  });
  document.querySelectorAll('[data-template]').forEach(button=>button.addEventListener('click',()=>{
    if(button.dataset.template===template)return;
    if(!window.confirm('Start from the '+button.textContent.trim()+' layout? You can undo this change.'))return;
    pushHistory(snapshot());
    template=button.dataset.template;
    state={...templates[template]};
    setFields();render();save();toast('Starting point changed. You can undo this.');
  }));
  undoButton.addEventListener('click',()=>{
    if(!past.length)return;
    const old=past.pop();future.push(snapshot());restore(old);updateHistoryButtons();toast('Change undone.');
  });
  redoButton.addEventListener('click',()=>{
    if(!future.length)return;
    const next=future.pop();past.push(snapshot());restore(next);updateHistoryButtons();toast('Change restored.');
  });
  document.getElementById('desktop-button').addEventListener('click',()=>{
    previewOuter.classList.remove('mobile-preview');
    document.getElementById('desktop-button').classList.add('is-active');
    document.getElementById('mobile-button').classList.remove('is-active');
    document.getElementById('desktop-button').setAttribute('aria-pressed','true');
    document.getElementById('mobile-button').setAttribute('aria-pressed','false');
  });
  document.getElementById('mobile-button').addEventListener('click',()=>{
    previewOuter.classList.add('mobile-preview');
    document.getElementById('mobile-button').classList.add('is-active');
    document.getElementById('desktop-button').classList.remove('is-active');
    document.getElementById('mobile-button').setAttribute('aria-pressed','true');
    document.getElementById('desktop-button').setAttribute('aria-pressed','false');
  });
  function docUrl(){
    return URL.createObjectURL(new Blob([getDocument()],{type:'text/html;charset=utf-8'}));
  }
  document.getElementById('preview-button').addEventListener('click',()=>{
    const link=docUrl();
    const opened=window.open(link,'_blank','noopener,noreferrer');
    if(!opened)toast('If the preview did not open, allow pop-ups or use Export HTML.');
    setTimeout(()=>URL.revokeObjectURL(link),60000);
  });
  document.getElementById('export-button').addEventListener('click',()=>{
    const link=docUrl();
    const anchor=document.createElement('a');
    anchor.href=link;anchor.download=(state.siteName.trim()||'my-website').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,60)+'.html';
    document.body.append(anchor);anchor.click();anchor.remove();
    setTimeout(()=>URL.revokeObjectURL(link),1500);
    toast('Website HTML downloaded. Hosting is not included with export.');
  });
  document.getElementById('request-launch').addEventListener('click',()=>{
    const subject='Website publishing inquiry — '+(state.siteName||'My Website').slice(0,70);
    const body='Hello The Sterlings,\n\nI built a website draft using The Sterlings Studio and would like to ask about publishing or managed hosting.\n\nWebsite name: '+state.siteName+'\nWebsite type: '+template+'\nHeadline: '+state.headline.slice(0,130)+'\nServices: '+state.services.slice(0,240).replace(/\n/g,', ')+'\n\nPlease share the available options and requirements.\n\nThank you.';
    window.location.href='mailto:'+inquiryInbox+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
    toast('Your email app should open. Review the message and send it there.');
  });
  document.getElementById('reset-button').addEventListener('click',()=>{
    if(!window.confirm('Reset this draft to its original layout? You can undo the reset.'))return;
    pushHistory(snapshot());state={...templates[template]};setFields();render();save();toast('Draft reset.');
  });
  document.querySelectorAll('[data-preview-section]').forEach(button=>button.addEventListener('click',()=>{
    document.querySelectorAll('[data-preview-section]').forEach(item=>item.classList.toggle('is-selected',item===button));
    const section=button.dataset.previewSection;
    try{ frame.contentWindow.location.hash=section==='home'?'':'#'+section;}
    catch{toast('Use the preview navigation to explore this page.');}
  }));
  try {
    const saved=localStorage.getItem(STORE_KEY);
    if(saved) {
      const data=JSON.parse(saved);
      if(data && data.state)restore(saved);else{setFields();render();}
    } else {setFields();render();save();}
  }catch{setFields();render();if(saveStatus)saveStatus.textContent='Storage unavailable — export your work';}
  updateHistoryButtons();
})();
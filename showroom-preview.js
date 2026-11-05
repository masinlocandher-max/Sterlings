/* These fictional brands are original layout demonstrations, not client work. */
(() => {
  'use strict';
  const demos = {
    atelier: {
      brand:'MORROW <span>ATELIER</span>',
      name:'Morrow Atelier',
      eyebrow:'INDEPENDENT CREATIVE PRACTICE',
      headline:'Design made<br><em>to mean more.</em>',
      intro:'Identity, imagery, and digital experiences with feeling at their foundation.',
      action:'Explore our practice',
      photo:'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
      photoAlt:'Warm-toned architectural interior with natural materials',
      mediaCaption:'MATERIAL / LIGHT / INTENTION',
      marqueeLeft:'IDENTITY / IMAGERY / EXPERIENCE',
      marqueeRight:'THOUGHTFUL DESIGN, ALWAYS',
      aboutKicker:'A POINT OF VIEW',
      aboutHeading:'Form follows<br><em>feeling.</em>',
      aboutText:'The way a brand looks matters. The way it makes someone feel matters even more. We create work with a clear purpose, lasting presence, and a distinct sense of character.',
      servicesHeading:'A considered practice.',
      services:[
        ['Identity systems','A distinctive language for your brand.'],
        ['Creative direction','Every visual detail, shaped with intention.'],
        ['Digital experiences','Thoughtful spaces built around people.']
      ],
      contactHeading:'Good ideas deserve<br><em>good company.</em>',
      contactCopy:'A fictional creative studio concept created for The Sterlings Showroom.'
    },
    residence: {
      brand:'CASA <span>SOLENNE</span>',
      name:'Casa Solenne',
      eyebrow:'INTIMATE STAYS / CONSIDERED MOMENTS',
      headline:'Somewhere to<br><em>feel at home.</em>',
      intro:'Quiet mornings, easy afternoons, and spaces made for slowing down.',
      action:'Explore the experience',
      photo:'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85',
      photoAlt:'Warm minimalist boutique hospitality interior',
      mediaCaption:'REST / DISCOVER / BELONG',
      marqueeLeft:'A SLOWER RHYTHM OF TRAVEL',
      marqueeRight:'CONSIDERED COMFORT',
      aboutKicker:'THE EXPERIENCE',
      aboutHeading:'A little less noise.<br><em>A little more life.</em>',
      aboutText:'An imagined retreat where every detail makes room for presence. Familiar comforts, beautiful surroundings, and the pleasure of finding a place you can call your own.',
      servicesHeading:'Stay for the details.',
      services:[
        ['Thoughtful rooms','An intimate place for every kind of pause.'],
        ['Shared moments','Spaces made for making memories.'],
        ['Local discovery','An invitation to explore at your own pace.']
      ],
      contactHeading:'The best memories<br><em>begin somewhere.</em>',
      contactCopy:'A fictional boutique hospitality concept. Reservations are not available.'
    },
    business: {
      brand:'NORTHLINE <span>PARTNERS</span>',
      name:'Northline Partners',
      eyebrow:'INDEPENDENT BUSINESS ADVISORY',
      headline:'Move forward<br><em>with clarity.</em>',
      intro:'Grounded thinking, practical strategy, and a trusted perspective for meaningful decisions.',
      action:'Explore our services',
      photo:'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85',
      photoAlt:'Contemporary professional workspace with natural light',
      mediaCaption:'EXPERTISE / TRUST / DIRECTION',
      marqueeLeft:'STRATEGY / SYSTEMS / PARTNERSHIP',
      marqueeRight:'STEADY THINKING FOR WHAT IS NEXT',
      aboutKicker:'HOW WE THINK',
      aboutHeading:'Good decisions<br><em>change everything.</em>',
      aboutText:'Business is personal. Our fictional advisory practice is built around understanding what matters, addressing what is complex, and keeping the path forward practical.',
      servicesHeading:'Clarity in every step.',
      services:[
        ['Strategic planning','Clear priorities and actionable direction.'],
        ['Business operations','Thoughtful systems for sustainable work.'],
        ['Growth advisory','A considered approach to the next stage.']
      ],
      contactHeading:'Your next move<br><em>starts here.</em>',
      contactCopy:'A fictional advisory firm concept. No professional consulting services are offered through this demonstration.'
    },
    portfolio: {
      brand:'ISLA <span>FRAMES</span>',
      name:'Isla Frames',
      eyebrow:'IMAGES / STORIES / EVERYDAY BEAUTY',
      headline:'The stories<br><em>between moments.</em>',
      intro:'Photography for the places we go, the people we meet, and the things we never want to forget.',
      action:'View the collection',
      photo:'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=85',
      photoAlt:'Natural landscape photographed in warm light',
      mediaCaption:'PORTRAITS / PLACES / CONNECTION',
      marqueeLeft:'AN IMAGE IS A STORY',
      marqueeRight:'BEAUTY IN THE ORDINARY',
      aboutKicker:'BEHIND THE LENS',
      aboutHeading:'Look closer.<br><em>Feel more.</em>',
      aboutText:'This imagined portfolio is a quiet celebration of observation. Small gestures, changing light, and familiar places become stories with space to breathe.',
      servicesHeading:'Moments in focus.',
      services:[
        ['Portrait stories','People, presence, and personality.'],
        ['Places & travel','Observing the world in its own light.'],
        ['Editorial projects','A visual language for new ideas.']
      ],
      contactHeading:'Every story<br><em>begins somewhere.</em>',
      contactCopy:'A fictional photographer portfolio concept created for The Sterlings Showroom.'
    }
  };
  const id = new URLSearchParams(location.search).get('space');
  const key = Object.prototype.hasOwnProperty.call(demos,id) ? id : 'atelier';
  const d = demos[key];
  document.body.dataset.space = key;
  document.title = d.name + ' — The Sterlings Showroom Concept';
  const byId = name => document.getElementById(name);
  const setText = (name, value) => {const node=byId(name);if(node)node.textContent=value;};
  const setAuthoredHtml = (name,value) => {const node=byId(name);if(node)node.innerHTML=value;};
  setAuthoredHtml('demo-brand',d.brand);
  setText('demo-eyebrow',d.eyebrow);
  setAuthoredHtml('demo-headline',d.headline);
  setText('demo-intro',d.intro);
  setText('demo-action-label',d.action);
  setText('demo-media-caption',d.mediaCaption);
  setText('demo-marquee-left',d.marqueeLeft);
  setText('demo-marquee-right',d.marqueeRight);
  setText('demo-about-kicker',d.aboutKicker);
  setAuthoredHtml('demo-about-heading',d.aboutHeading);
  setText('demo-about-text',d.aboutText);
  setText('demo-services-heading',d.servicesHeading);
  setAuthoredHtml('demo-contact-heading',d.contactHeading);
  setText('demo-contact-copy',d.contactCopy);
  setText('demo-footer-brand',d.name.toUpperCase());
  const media=byId('demo-hero-media');
  if(media){
    media.style.backgroundImage='url("'+d.photo+'")';
    media.setAttribute('aria-label',d.photoAlt);
  }
  const cards=document.querySelector('.demo-service-list');
  if(cards){
    cards.textContent='';
    d.services.forEach(([title,description],i)=>{
      const article=document.createElement('article');
      article.className='demo-service-card';
      const counter=document.createElement('span');
      counter.textContent=String(i+1).padStart(2,'0');
      const heading=document.createElement('h3');
      heading.textContent=title;
      const copy=document.createElement('p');
      copy.textContent=description;
      article.append(counter,heading,copy);
      cards.append(article);
    });
  }
})();
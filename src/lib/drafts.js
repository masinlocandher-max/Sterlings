import {templates} from './data.js';
export const STORAGE_KEY='sterlings.drafts.v1';
const fields={name:80,headline:140,description:300,buttonLabel:50,buttonLink:300,about:1000,serviceText:1000,contactText:300};
export function normalizeDraft(value){
 if(!value||typeof value!=='object'||typeof value.id!=='string'||!/^[\w-]{1,100}$/.test(value.id))return null;
 const template=templates.find(t=>t.id===value.template)||templates[0];
 const d={id:value.id,template:template.id,theme:['light','dark','sand'].includes(value.theme)?value.theme:template.theme,accent:/^#[a-f\d]{6}$/i.test(value.accent||'')?value.accent:template.accent,updatedAt:Number.isFinite(value.updatedAt)?value.updatedAt:0};
 for(const [key,max] of Object.entries(fields))d[key]=typeof value[key]==='string'?value[key].slice(0,max):'';
 return d;
}
export function draftId(random=globalThis.crypto){
 if(typeof random.randomUUID==='function')return random.randomUUID();
 const bytes=random.getRandomValues(new Uint8Array(16));
 bytes[6]=(bytes[6]&15)|64;bytes[8]=(bytes[8]&63)|128;
 const hex=Array.from(bytes,b=>b.toString(16).padStart(2,'0')).join('');
 return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`;
}
export function newDraft(templateId='studio'){
 const t=templates.find(x=>x.id===templateId)||templates[0];
 return {id:draftId(),template:t.id,name:'Your '+(t.category==='Organization'?'Collective':t.category==='Business'?'Business':'Studio'),headline:t.headline,description:t.description,buttonLabel:t.buttonLabel,buttonLink:'#contact',about:t.about,serviceText:'Thoughtful design\nA clear point of view\nPersonal collaboration',contactText:'Have something in mind? Let’s start a conversation.',theme:t.theme,accent:t.accent,updatedAt:Date.now()};
}
export function browserStorage(){try{return window.localStorage;}catch{return null;}}
export function readDrafts(storage=browserStorage()){
 try{const data=JSON.parse(storage?.getItem(STORAGE_KEY)||'null');if(data?.version!==1||!Array.isArray(data.items))return [];return data.items.map(normalizeDraft).filter(Boolean).slice(0,50).sort((a,b)=>b.updatedAt-a.updatedAt);}catch{return [];}
}
export function writeDraft(draft,storage=browserStorage()){
 const d=normalizeDraft({...draft,updatedAt:Date.now()});if(!d)return {ok:false,error:'This draft could not be saved.'};
 try{if(!storage)throw Error();const all=readDrafts(storage).filter(x=>x.id!==d.id);if(all.length>=50)return {ok:false,error:'This device has 50 drafts. Download and remove one before creating another.'};storage.setItem(STORAGE_KEY,JSON.stringify({version:1,items:[d,...all]}));return {ok:true,draft:d};}catch{return {ok:false,error:'This browser cannot save the draft. Keep this page open and download your website to keep your work.'};}
}
export function removeDraft(id,storage=browserStorage()) {try{if(!storage)throw Error();storage.setItem(STORAGE_KEY,JSON.stringify({version:1,items:readDrafts(storage).filter(x=>x.id!==id)}));return true;}catch{return false;}}
export function escapeHtml(text){return String(text??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
export function safeHref(value){const s=String(value||'').trim();if(/^#[a-z][\w-]*$/i.test(s))return s;try{const u=new URL(s);if(['https:','http:','mailto:','tel:'].includes(u.protocol))return u.href;}catch{}return '#contact';}
export function downloadFile(text,name,type='text/plain'){const u=URL.createObjectURL(new Blob([text],{type}));const a=document.createElement('a');a.href=u;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),1000);}

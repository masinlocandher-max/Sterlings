import {useSyncExternalStore} from 'react';
const subscribe = fn => { window.addEventListener('popstate',fn);window.addEventListener('sterlings:navigate',fn);return()=>{window.removeEventListener('popstate',fn);window.removeEventListener('sterlings:navigate',fn);};};
export function navigate(to,replace=false){window.history[replace?'replaceState':'pushState']({},'',to);window.dispatchEvent(new Event('sterlings:navigate'));window.scrollTo({top:0,behavior:'instant'});}
export function useLocation(){const key=useSyncExternalStore(subscribe,()=>location.pathname+location.search,()=>'/');const url=new URL(key,location.origin);return {path:url.pathname.replace(/\/$/,'')||'/',params:url.searchParams,key};}

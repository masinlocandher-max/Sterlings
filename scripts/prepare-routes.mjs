import fs from 'node:fs/promises';
const html=await fs.readFile('dist/index.html','utf8');
const routes=['pricing','about','contact','solutions','templates','how-it-works','website-rental','managed-websites','digital-solutions','get-started','workspace','builder','privacy','about-preview'];
for(const route of routes){await fs.mkdir('dist/'+route,{recursive:true});await fs.writeFile('dist/'+route+'/index.html',html);}
await fs.writeFile('dist/404.html',html);

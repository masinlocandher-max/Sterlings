import {defineConfig} from 'vite';
export default defineConfig({esbuild:{jsx:'automatic'},server:{host:'0.0.0.0',allowedHosts:true},build:{target:'es2022'}});

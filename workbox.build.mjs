import { injectManifest } from 'workbox-build';


// Use the compiled service worker in dist (Vite builds src/sw/sw.ts to dist/sw.js)
const swSrc = 'dist/sw.js';
const swDest = 'dist/sw.js';


const { count, size, warnings } = await injectManifest({
swSrc,
swDest,
globDirectory: 'dist',
globPatterns: ['**/*.{html,js,css,svg,png,webmanifest}']
});


warnings.forEach((w) => console.warn(w));
console.log(`Injected ${count} assets, ~${(size/1024).toFixed(1)}KB`);
import './ui/styles.css';
import { createStore } from './state/createStore';
import { render } from './ui/render';
import { throttle } from './utils/throttle';
import { onIdle } from './utils/idle';
import { Workbox } from 'workbox-window';

const store = createStore();

// Render on state changes (throttled)
const throttledRender = throttle(render, 50);
store.subscribe(throttledRender);

// Hydrate when idle
onIdle(() => {
  store.init();
});

// UI wiring
const form = document.getElementById('add-form') as HTMLFormElement;
const nameInput = document.getElementById('habit-name') as HTMLInputElement;
const freqSelect = document.getElementById('habit-freq') as HTMLSelectElement;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  if (!name) return;
  const freq = (freqSelect.value as 'daily' | 'weekly') || 'daily';
  await store.addHabit(name, freq);
  form.reset();
  nameInput.focus();
});

document.getElementById('habit-list')!.addEventListener('click', async (e) => {
  const target = e.target as HTMLElement;
  const action = target.dataset.action;
  const id = target.dataset.id;
  if (!action || !id) return;
  if (action === 'remove') {
    await store.removeHabit(id);
  } else if (action === 'complete') {
    target.setAttribute('aria-pressed', 'true');
    await store.markComplete(id, new Date().toISOString());
  }
});

// SW registration (progressive)
// SW registration (progressive) - only register in production builds.
// In Vite dev server /sw.js doesn't exist and the dev server will return
// the app HTML (text/html), which causes the browser SecurityError when
// trying to register the worker. Guarding by import.meta.env.PROD prevents
// that fetch during development.
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  const wb = new Workbox('/sw.js');
  wb.addEventListener('activated', () => console.log('SW activated'));
  wb.register();
} else {
  // In dev mode we skip SW registration to avoid the unsupported MIME type error
  // from the dev server returning index.html for unknown routes like /sw.js.
  // If you want to test the service worker locally, build the app and serve
  // the `dist` folder (or place a sw.js in `public/`).
  // console.debug('Service worker registration skipped (dev)');
}

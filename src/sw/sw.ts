/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */
import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import {  CacheFirst } from 'workbox-strategies';
import { Queue } from 'workbox-background-sync';

declare const self: ServiceWorkerGlobalScope;
clientsClaim();

// self.__WB_MANIFEST is replaced at build time
precacheAndRoute(self.__WB_MANIFEST);

// App shell navigation fallback
registerRoute(
  ({ request }) => request.mode === 'navigate',
  createHandlerBoundToURL('/index.html'),
);

// Static assets (cache-first)
registerRoute(
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new CacheFirst({ cacheName: 'assets-v1' }),
);

// API sync queue (optional)
const syncQueue = new Queue('offline-mutations');
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method === 'POST' && new URL(req.url).pathname.startsWith('/sync')) {
    event.respondWith(
      (async () => {
        try {
          const res = await fetch(req.clone());
          return res;
        } catch (err) {
          await syncQueue.pushRequest({ request: req });
          return new Response(JSON.stringify({ queued: true }), {
            status: 202,
          });
        }
      })(),
    );
  }
});

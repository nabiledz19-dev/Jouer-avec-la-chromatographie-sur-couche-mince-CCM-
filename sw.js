/* Service worker — CCM Édition Firas */
const CACHE = 'ccm-firas-v1';

const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './i18n.js',
  './game.js',
  './sound.js',
  './fiche-ccm.html',
  './manifest.webmanifest',
  './images/logo-professeur.png',
  './images/logo-professeur.ico',
  './images/icon-192.png',
  './images/icon-maskable-512.png',
  './images/favicon.png',
  './images/favicon.ico',
  './images/tlc-hero.jpg',
  './images/cadeau.jpg',
  './images/professeur.webp'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  /* L'API en ligne (scores, duels, accès) ne doit jamais être mise en cache. */
  if (url.pathname.indexOf('/api/') !== -1) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put('./index.html', copy));
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      const network = fetch(request)
        .then(response => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE).then(cache => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});

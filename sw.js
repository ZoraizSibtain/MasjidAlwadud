// Service Worker for Masjid Alwadud PWA
const CACHE_NAME = 'alwadud-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/site.webmanifest'
];

// Install event - cache essential files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fall back to network
self.addEventListener('fetch', event => {
  // Skip API calls and external requests
  if (event.request.url.includes('/api/') || 
      !event.request.url.includes(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(response => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200) {
              return response;
            }
            // Clone the response
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return response;
          });
      })
      .catch(() => {
        // Return offline page or empty response
        return new Response('Offline - Please check your connection', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({
            'Content-Type': 'text/plain'
          })
        });
      })
  );
});

// Handle background sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'sync-newsletter') {
    event.waitUntil(syncNewsletter());
  }
  if (event.tag === 'sync-donation') {
    event.waitUntil(syncDonation());
  }
});

// Placeholder sync functions (implement as needed)
async function syncNewsletter() {
  // Retry failed newsletter submissions
  console.log('Syncing newsletter...');
}

async function syncDonation() {
  // Retry failed donations (handle carefully!)
  console.log('Syncing donation...');
}

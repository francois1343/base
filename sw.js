const version = 1.1
const CACHE_NAME = `demo-${version}`

const files = [
  "./",
  './index.html',
  "./style.css",
  "./main.js",
  "./js/install.js",
  "./js/register-sw.js",
  "./icons/favicon-16x16.png",
  "./icons/favicon-256x256.png",
  "./favicon.ico"
]

self.addEventListener('install', e => {
  console.log('sw', 'installation')
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(files))
  )
  self.skipWaiting();
})

self.addEventListener('activate', e => {
  console.log('sw', 'activate')
  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        const delCaches = []
        cacheNames.forEach(cacheName => {
          if (cacheName !== CACHE_NAME) {
            delCaches.push(caches.delete(cacheName))
          }
        })

        return Promise.all(delCaches)
      })
  )
  self.clients.claim()
})

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(response => response || fetch(e.request))
  )
})
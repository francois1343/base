// Augmente cette version pour créer un nouveau cache après une mise à jour.
const version = 1.5
const CACHE_NAME = `demo-${version}`

// Fichiers disponibles hors ligne dès l'installation du service worker.
const files = [
  "./",
  './index.html',
  "./style.css",
  "./main.js",
  "./manifest.json",
  "./js/install.js",
  "./js/register-sw.js",
  "./icons/favicon-16x16.png",
  "./icons/favicon-256x256.png",
  "./favicon.ico",
  "https://ingrwf13-default-rtdb.europe-west1.firebasedatabase.app/todos.json"
]

self.addEventListener('install', e => {
  console.log('sw', 'installation')
  // Attend la fin de la mise en cache avant de terminer l'installation.
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(files))
  )
  // Active immédiatement la nouvelle version du service worker.
  self.skipWaiting();
})

self.addEventListener('activate', e => {
  console.log('sw', 'activate')
  // Supprime les caches créés par les anciennes versions.
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
  // Permet au nouveau service worker de contrôler les onglets ouverts.
  self.clients.claim()
})

// Stratégie « cache d'abord » : rapide hors ligne, puis réseau si nécessaire.
const cacheFirst = async (request) => {
  const responseFromCache = await caches.match(request)
  if (responseFromCache) {
    return responseFromCache
  }

  const responseFromNetwork = await fetch(request)

  // Garde en cache uniquement les réponses réseau réussies.
  if (responseFromNetwork.ok) {
    const cache = await caches.open(CACHE_NAME)
    await cache.put(request, responseFromNetwork.clone())
  }

  return responseFromNetwork
}

// Récupère une version fraîche depuis le réseau et met le cache à jour.
const update = async (request) => {
  const response = await fetch(request)
  const cache = await caches.open(CACHE_NAME)
  await cache.put(request, response.clone())

  return response
}

// Stratégie « réseau d'abord », avec le cache comme solution de secours.
const networkFirst = async (request) => {
  try {
    return await update(request)
  }
  catch {
    return caches.match(request)
  }
}

/*
self.addEventListener('fetch', e => {
  // Les ressources d'extensions (chrome-extension://) ne peuvent pas être mises en cache.
  const url = new URL(e.request.url);

  // On ignore ce qui n'est pas HTTP/HTTPS
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return;
  }

  // Les fichiers de l'app utilisent le cache ; les données Firebase privilégient le réseau.
  if (!e.request.url.includes("firebase")) {
    e.respondWith(
      cacheFirst(e.request)
    )
  }
  else {
    e.respondWith(
      networkFirst(e.request)
    )
  }
}) */

//add push notif
self.addEventListener('push', e => {
  if (!(self.Notification && self.Notification.permission == "granted")) {
    return
  }
  console.log('push notif ok')
  const data = e.data?.json() ?? {}
  const title = data.title || "Titre par défaut"
  const url = data.url || "https://cepegra.be"
  const message = data.message || "Message par défaut"
  const icon = data.icon || "./icons/favicon-96x96.png"

  const notification = registration.showNotification(title, {
    body: message,
    tag: "simple-push-demo",
    icon,
    data: {
      url
    }
  })
})

self.addEventListener('notificationclick', e => {
  e.notification.close()
  e.waitUntil(
    clients.openWindow(e.notification.data.url)
  )
})
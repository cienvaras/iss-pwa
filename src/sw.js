let urlsToCache = [
  '/',
  '/index.html',
  '/static/manifest.json',
  '/bundle.js',
  'style.css',
  'https://fonts.googleapis.com/css?family=Raleway',
  'https://fonts.gstatic.com/s/raleway/v11/QAUlVt1jXOgQavlW5wEfxQLUuEpTyoUstqEm5AMlJo4.woff2'
]

self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open('iss-pwa-base-v1')
      .then(function (cache) {
        console.log('Opened cache')
        return cache.addAll(urlsToCache)
      })
  )
})

self.addEventListener('fetch', function (event) {
  console.log('Fetch event for ', event.request.url)
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        console.log('Found ', event.request.url, ' in cache')
        return response
      }
      console.log('Network request for ', event.request.url)
      return fetch(event.request)
    }).catch(function (error) {
      console.log('Error fetching data from network')
      console.log(error)
      return new Response('Not Found', {status: 404})
    })
  )
})

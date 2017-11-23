
const cacheName = 'WebApp';
const offlineUrl = 'offlinePage.html';

// Cache our known resources during install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([ 
        './home.js',
        './style.css',
        './index.html',
        './camping.png',
        './camping2.png',
        './camping2.png',
        './webAPP.json',
        offlineUrl
      ]))
    );
});
self.addEventListener('fetch', event => { 
  
  event.respondWith(caches.match(event.request).then(function (response) {
    if (response) {
      return response;
    }
    var fetchRequest = event.request.clone();
    
    return fetch(fetchRequest).then(function (response) {
      if (!response || response.status !== 200) {
      return response;
      }
      var responseToCache = response.clone();
      caches.open(cacheName).then(function (cache) {
      cache.put(event.request, responseToCache);
      });
      
      return response;
  }).catch(error => { 
      if (event.request.method === 'GET' &&
        event.request.headers.get('accept').includes('text/html')) {
          return caches.match(offlineUrl); 
      }
  });
}));



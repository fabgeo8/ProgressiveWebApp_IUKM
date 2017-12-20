var cacheName = 'WebAPP';
const offlineUrl = '/offlinePage.html'; 
importScripts('/idb-keyval.js');

self.addEventListener('install', event => { 
   event.waitUntil(
     caches.open(cacheName) 
     .then(cache => cache.addAll([ 
       '/camping.png',
       '/camping2.png',
       '/home.js',
       '/idb-keyval.js',
       '/index.html',
       '/style.css',
       '/webAPP.json',
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
  });



self.addEventListener('sync', (event) => { 
   if (event.tag === 'textNachricht') { 
      event.waitUntil(
         idbKeyval.get('todo').then(value => 
            fetch('/todo', { 
               method: 'POST',
               headers: new Headers({ 'content-type': 'application/json' }),
               body: JSON.stringify(value) 
         })));
         idbKeyval.delete('todo'); 
      }
});

self.addEventListener('push', function (event) {
 var payload = event.data ? JSON.parse(event.data.text()) : 'no payload'; 
 var title = 'Progressive Times';
 event.waitUntil(
   self.registration.showNotification(title, { 
      body: payload.msg,
      url: payload.url,
      icon: payload.icon
   })
 );
});






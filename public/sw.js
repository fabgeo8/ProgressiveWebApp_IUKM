var cacheName = ‘WebAPP’; 
self.addEventListener('install', event => { 
   event.waitUntil(
     caches.open(cacheName) 
     .then(cache => cache.addAll([ 
       '/camping.png',
       '/camping2.png',
       '/homes.js',
       '/idb-keyval.js',
       '/index.html',
       '/offlinePage.html',
       '/style.css',
       '/webAPP.json' 
     ]))
   );
});

self.addEventListener('fetch', function(event) { 
 event.respondWith(
   caches.match(event.request) 
   .then(function(response) {
     if (response) { 
       return response;
       }
         var requestToCache = event.request.clone(); 
         return fetch(requestToCache).then( 
         function(response) {
         if(!response || response.status !== 200) { 
         return response;
         }
         var responseToCache = response.clone(); 
         caches.open(cacheName) 
         .then(function(cache) {
         cache.put(requestToCache, responseToCache); 
         });
         return response;
       } 
     );
   })
 );
});




importScripts('./idb-keyval.js');
self.addEventListener('sync', (event) => { 
if (event.tag === 'notizen') { 
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


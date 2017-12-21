var cacheName = 'WebAPP';
const offlineUrl = '/offlinePage.html'; 
importScripts('./idb-keyval.js');

self.addEventListener('install', event => { 
   event.waitUntil(
     caches.open(cacheName) 
     .then(cache => cache.addAll([ 
       '/camping.png',
       '/camping2.png',
       '/home.js',
       '/serviceworker.js',
       '/idb-keyval.js',
       '/index.html',
       '/style.css',
       '/webAPP.json',
        offlineUrl
     ]))
   );
}); 

this.addEventListener('fetch', function (event) {
 if(event.request.headers.get('save-data')){
 if (event.request.url.includes('fonts.googleapis.com')) {
 event.respondWith(new Response('', {status: 417, statusText: 'Ignore fonts to save data.' }));
 }
 }
});



this.addEventListener('fetch', event => {
    if (event.request.method === 'GET' &&
      event.request.headers.get('accept').includes('text/html')) { 
          event.respondWith(
             fetch(event.request.url).catch(error => { 
                return caches.match(offlineUrl); 
                })
             );
          }
       else{
       event.respondWith(fetch(event.request)); 
    }
});



self.addEventListener('sync', (event) => { 
   console.log("sync fired");
   if (event.tag === 'textNachricht') { 
      event.waitUntil(
         idbKeyval.get('data').then(value => 
            fetch('/todo', { 
               method: 'POST',
               headers: new Headers({ 'content-type': 'application/json' }),
               body: JSON.stringify(value) 
         }).then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
      }
      console.log(response);
      send_message_to_all_clients("post complete");
      
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  })));
         
         idbKeyval.delete('data'); 
                    

      }
});

self.addEventListener('push', function (event) {
 var payload = event.data ? JSON.parse(event.data.text()) : 'no payload'; 
 var title = 'Todo List';
 event.waitUntil(
   self.registration.showNotification(title, { 
      body: payload.msg,
      url: payload.url,
      icon: payload.icon
   })
 );
}); 

function send_message_to_all_clients(msg){
    clients.matchAll().then(clients => {
        clients.forEach(client => {
            send_message_to_client(client, msg).then(m => console.log("SW Received Message: "+m));
        })
    })
}

function send_message_to_client(client, msg){
    return new Promise(function(resolve, reject){
        var msg_chan = new MessageChannel();

        msg_chan.port1.onmessage = function(event){
            if(event.data.error){
                reject(event.data.error);
            }else{
                resolve(event.data);
            }
        };

        client.postMessage(msg, [msg_chan.port2]);
    });
}





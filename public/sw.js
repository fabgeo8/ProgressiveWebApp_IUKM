importScripts('./idb-keyval.js');
self.addEventListener('sync', (event) => { 
if (event.tag === 'notizen') { 
event.waitUntil(
idbKeyval.get('sendMessage').then(value => 
fetch('/sendMessage/', { 
method: 'POST',
headers: new Headers({ 'content-type': 'application/json' }),
body: JSON.stringify(value) 
})));
idbKeyval.delete('sendMessage'); 
}
});


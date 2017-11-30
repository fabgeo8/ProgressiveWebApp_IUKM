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


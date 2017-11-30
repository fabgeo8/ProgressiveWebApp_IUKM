
if ('serviceWorker' in navigator && 'SyncManager' in window) { 
navigator.serviceWorker.register('./sw.js')
.then(registration => navigator.serviceWorker.ready)
.then(registration => {
document.getElementById('submit').addEventListener('click', () => {
registration.sync.register('notizen').then(() => {
var payload = {
notiz: document.getElementById('text').value,

};
idbKeyval.set('sendMessage', payload);
});
});
});
} else {
document.getElementById('submit').addEventListener('click', () => { 
var payload = { 
notiz: document.getElementById('text').value,

};
fetch('/sendMessage/', 
{
method: 'POST',
headers: new Headers({
'content-type': 'application/json'
}),
body: JSON.stringify(payload)
});
});

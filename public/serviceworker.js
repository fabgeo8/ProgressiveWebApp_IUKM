
if ('serviceWorker' in navigator && 'SyncManager' in window && navigator.onLine) { 
navigator.serviceWorker.register('./sw.js')
.then(registration => navigator.serviceWorker.ready)
  /*.then(registration => {
    document.getElementById('newtodo').addEventListener('click', () => {
      registration.sync.register('notizen').then(() => {
        var payload = {
          text: document.getElementById('text').value,
        };
      idbKeyval.set('todo', payload);
      });
    });
}); */
} else {
document.getElementById('submit').addEventListener('click', () => { 
var payload = { 
text: document.getElementById('text').value,

};
fetch('/todo', 
{
method: 'POST',
headers: new Headers({
'content-type': 'application/json'
}),
body: JSON.stringify(payload)
});
});
}

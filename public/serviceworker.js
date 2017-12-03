
if ('serviceWorker' in navigator && 'SyncManager' in window) { 
    
if  (navigator.onLine){
navigator.serviceWorker.register('./sw.js')
console.log('serviceWorker regiistriert!')
}else{

        document.getElementById('newtodo').addEventListener('click', () => {
          registration.sync.register('notizen').then(() => {
            var payload = {
              text: document.getElementById('text').value,
            };
          idbKeyval.set('todo', payload);
          });
        });

 }
} else {
/*document.getElementById('submit').addEventListener('click', () => { 
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
});*/
}

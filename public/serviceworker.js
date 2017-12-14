
if ('serviceWorker' in navigator) { 
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }).catch(function(err) { 
                console.log('ServiceWorker registration failed: ', err);
    });
} 
if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.register('/sw.js')
    .then(registration => navigator.serviceWorker.ready) 
    .then(registration => {
        document.getElementById('newtodo').addEventListener('submit', () => {          
            registration.sync.register('textNachricht').then(() => { 
    var payload = {
        text: document.getElementById('text').value,
    };
                
    idbKeyval.set('todo', payload); 
            });
              
        });
    });
}else {
document.getElementById('newtodo').addEventListener('submit', () => {
   
var payload = {
    text: document.getElementById('text').value,
};
fetch('/todo', 
{
        method: 'post',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify(payload)
})
.then(displayMessageNotification('Message sent')) 
.catch((err) => displayMessageNotification('Message failed'));
      
})
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('/sw.js')

.then(function(swReg) {
  console.log('Service Worker is registered', swReg);

  swRegistration = swReg;
        console.log('initialize ok 1');
  initializeUI();
      console.log('initialize ok 2');
})
  .catch(function(error) {
  console.log('Service Worker Error');
  });
} else {
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
}

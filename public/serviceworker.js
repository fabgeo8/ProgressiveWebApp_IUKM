
if ('serviceWorker' in navigator) { 
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }).catch(function(err) { 
                console.log('ServiceWorker registration failed: ', err);
    });
} 
if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
    return registration.pushManager.getSubscription() 
        .then(function(subscription) {
        if (subscription) { 
            return;
        }
        return registration.pushManager.subscribe({ 
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
        })
        .then(function(subscription) {
            var rawKey = subscription.getKey ? subscription.getKey('p256dh') : ''; 
            key = rawKey ? btoa(String.fromCharCode.apply(null, new
Uint8Array(rawKey))) : '';
            var rawAuthSecret = subscription.getKey ? subscription.getKey('auth') : '';
            authSecret = rawAuthSecret ?
            btoa(String.fromCharCode.apply(null, new Uint8Array(rawAuthSecret))) : '';
            endpoint = subscription.endpoint;
            return fetch('/todo', { 
                method: 'post',
                headers: new Headers({
                    'content-type': 'application/json'
                }),
                body: JSON.stringify({
                    endpoint: subscription.endpoint,
                    key: key,
                    authSecret: authSecret,
                }),
            });
        });
    });
         }).catch(function(err) {
 console.log('ServiceWorker registration failed: ', err);
 });
 } 

function unsubscribe() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
            .then((serviceWorkerRegistration) => {
                serviceWorkerRegistration.pushManager.getSubscription() 
                    .then((subscription) => {
                        if (!subscription) {
                            console.log("Not subscribed, nothing to do.");
                            return;
                        }
                        subscription.unsubscribe() 
                            then(function() {
                                console.log("Successfully unsubscribed!.");
                            })
                            .catch((e) => {
                                logger.error('Error thrown while unsubscribing from push messaging', e);
                            });
                        });
     });
    }
}
document.getElementById("unsubscribe").addEventListener("click", unsubscribe); 

if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');
    navigator.serviceWorker.register('/sw.js')

.then(function(swReg) {
  swRegistration = swReg;
  initializeUI();
})
  .catch(function(error) {
  console.log('Service Worker Error');
  });
} else {
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
}

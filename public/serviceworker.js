
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
         addSyncEvent();
     
    
 });
    console.log('Service Worker and Sync is supported');
  }else {
  document.getElementById('submit').addEventListener('click', () => {
     
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
/* if ('serviceWorker' in navigator && 'PushManager' in window) {
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
            return fetch('/pushNot', { 
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
 */
function addSyncEvent(){
	$('#newtodo').submit(function(e){
		registration.sync.register('textNachricht').then(() => { 
			e.preventDefault();
			console.log('submit');	
			var payload = {'text': $('#text').val()}
			idbKeyval.set('data', payload); 	
			$('#newtodo')[0].reset();
              	});
		
	});
}

/*
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
} */





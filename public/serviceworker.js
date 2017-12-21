
/*if ('serviceWorker' in navigator) { 
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }).catch(function(err) { 
                console.log('ServiceWorker registration failed: ', err);
    });
} */
 if ('serviceWorker' in navigator && 'SyncManager' in window) {
     navigator.serviceWorker.register('/sw.js')
	 .then(navigator.serviceWorker.ready).then(function(registration) {
	 //addSyncEvent();
	 $('#newtodo').submit(function(e){
			e.preventDefault();
			console.log('submit');
			registration.sync.register('textNachricht').then(function() { 
				
			var payload = {'text': $('#text').val()};
			idbKeyval.set('data', payload); 
			console.log("textNachricht registered with payload" + payload);
			//reset input field
			$('#newtodo')[0].reset();
		});
		
	});	
     
    console.log('Service Worker and Sync is supported');
	 //navigator.serviceWorker.ready.then(function() { console.log("hi service worker ist parat") })
	
 }).catch(function(){
		 console.log("unable to register for sync");
		// system was unable to register for a sync,
		// this could be an OS-level restriction
		addSubmitPostEvent();
	 });
    
  }else {
		console.log("sync not supported");
		addSubmitPostEvent();
 }

if('serviceWorker' in navigator){
	navigator.serviceWorker.ready.then(function(){
	    // Handler for messages coming from the service worker
	    navigator.serviceWorker.addEventListener('message', function(event){
		console.log("Client 1 Received Message: " + event.data);
		if(event.data == "post complete"){
			listTodo();	
		}

		event.ports[0].postMessage("OK");
		});
	});
}
 
if ('serviceWorker' in navigator){
	navigator.serviceWorker.ready.then(function (registration){
		registration.pushManager.getSubscription() 
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
				key = rawKey ? btoa(String.fromCharCode.apply(null, new Uint8Array(rawKey))) : '';
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
						authSecret: authSecret
					}),
				});
			});
		});
	 });
 }

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


/*function unsubscribe() {
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

function urlBase64ToUint8Array(base64String) {
	const padding = '='.repeat((4 - base64String.length % 4) % 4);
	const base64 = (base64String + padding)
		.replace(/\-/g, '+')
		.replace(/_/g, '/');
	
	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);
	
	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}





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
        document.getElementById('submit').addEventListener('click', () => { 
            registration.sync.register('textNachricht').then(() => { 
    var payload = {
        text: document.getElementById('text').value,
    };
                
    idbKeyval.set('sendMessage', payload); 
            });
        });
    });
}

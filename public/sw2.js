"use strict";
this.addEventListener('fetch', function (event) {
if(event.request.headers.get('save-data')){
// We want to save data, so restrict icons and fonts
if (event.request.url.includes('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js')) {
// return nothing
event.respondWith(new Response('', {status: 417, statusText: 'Ignore fonts to save data.' }));
}
}
});

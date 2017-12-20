var endpoint;
var key;
var authSecret;
var vapidPublicKey = 'BAyb_WgaR0L0pODaR7wWkxJi__tWbM1MPBymyRDFEGjtDCWeRYS9EF7yGoCHLdHJi6hikYdg4MuYaK0XoD0qnoY';


function urlB64ToUint8Array(base64String) {
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

const webpush = require('web-push'); 
const express = require('express');
var bodyParser = require('body-parser');
const app = express();
webpush.setVapidDetails( 
 'mailto:contact@deanhume.com',
'BAyb_WgaR0L0pODaR7wWkxJi__tWbM1MPBymyRDFEGjtDCWeRYS9EF7yGoCHLdHJi6hikYdg4MuYaK0XoD0qnoY',
 'p6YVD7t8HkABoez1CvVJ5bl7BnEdKUu5bSyVjyxMBh0'
);
app.post('/todo', function (req, res) { 
  var endpoint = req.body.endpoint;
saveRegistrationDetails(endpoint, key, authSecret); 
 const pushSubscription = { 
  endpoint: req.body.endpoint,
    keys: {
      auth: req.body.authSecret,
      p256dh: req.body.key
      }
 };
 var body = 'Thank you for registering';
 var iconUrl = 'https://example.com/images/homescreen.png';
 webpush.sendNotification(pushSubscription, 
  JSON.stringify({
    msg: body,
    url: 'http://localhost:3111/',
    icon: iconUrl
 }))
 .then(result => res.sendStatus(201))
 .catch(err => { console.log(err); });
});
app.listen(3111, function () {
 console.log('Web push app listening on port 3111!')
});


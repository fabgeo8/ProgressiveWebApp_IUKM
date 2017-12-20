var express = require('express');
var app = express();

const webpush = require('web-push'); 
const express = require('express');
var bodyParser = require('body-parser');
const app = express();
webpush.setVapidDetails( 
 'mailto:contact@deanhume.com',
'BAyb_WgaR0L0pODaR7wWkxJi__tWbM1MPBymyRDFEGjtDCWeRYS9EF7yGoCHLdHJi6hikYdg4MuYaK0XoD0qnoY',
 'p6YVD7t8HkABoez1CvVJ5bl7BnEdKUu5bSyVjyxMBh0'
);
app.post('/pushNot', function (req, res) { 
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
 webpush.sendNotification(pushSubscription, 
  JSON.stringify({
    msg: body,
    url: 'http://localhost:3111/',
 }))
 .then(result => res.sendStatus(201))
 .catch(err => { console.log(err); });
});
app.listen(3111, function () {
 console.log('Web push app listening on port 3111!')
});

app.use(express.static('public'));


var bodyParser = require('body-parser');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(express.json());

var todo = [];
var done = [];


app.post('/todo', function (req, res) {
	console.log('request erhalten');
	console.log(req.body);
	var item = req.body.text;
	todo.push(item);
	res.send(todo);
});

app.get('/todo', function (req, res){
	res.send(todo);
});

app.post('/undo', function (req, res){
	console.log("undo request erhalten");
	var id = req.body.id;
	todo.push(done[id]);
	done.splice(id, 1);
	res.status(200).send('OK');
});

app.post('/done', function (req, res){
	console.log('request erhalten');
	console.log(req.body);
	var id = req.body.id;
	done.push(todo[id]);
	todo.splice(id, 1);
	res.status(200).send('OK');
});

app.get('/done', function (req, res){
	res.send(done);
});

app.listen(process.env.PORT || 8080);

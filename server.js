var express = require('express');
const webpush = require('web-push'); 
var bodyParser = require('body-parser');
var app = express();

app.use(express.json());


app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

webpush.setVapidDetails( 
 'mailto:contact@deanhume.com',
'BAyb_WgaR0L0pODaR7wWkxJi__tWbM1MPBymyRDFEGjtDCWeRYS9EF7yGoCHLdHJi6hikYdg4MuYaK0XoD0qnoY',
 'p6YVD7t8HkABoez1CvVJ5bl7BnEdKUu5bSyVjyxMBh0'
);

app.post('/pushNot', function (req, res) { 
  var endpoint = req.body.endpoint;
  var key = req.body.key;
  var authSecret = req.body.authSecret;
	
saveRegistrationDetails(endpoint, key, authSecret); 
	
 const pushSubscription = { 
  endpoint: req.body.endpoint,
    keys: {
      auth: req.body.authSecret,
      p256dh: req.body.key
      }
 };
	
 sendPushNotification("Thank you for registering");
});

function sendPushNotification(msg){
	var body = msg;
	var iconUrl = 'https://d30y9cdsu7xlg0.cloudfront.net/png/12540-200.png';
	webpush.sendNotification(pushSubscription, 
	JSON.stringify({
		msg: body,
		url: 'https://iuk.herokuapp.com/',
		icon: iconUrl
	}))
	.then(result => res.sendStatus(201))
	.catch(err => { console.log(err); });	
	
}

function saveRegistrationDetails(endpoint, key, authSecret) {
  // Save the users details in a DB
}

app.use(express.static('public'));

var todo = [];
var done = [];

app.post('/todo', function (req, res) {
	console.log('request erhalten');
	console.log(req.body);
	var item = req.body.text;
	if(item){
		console.log('request item: '+ item);
		todo.push(item);
	}
	sendPushNotification("New item added: "+ item);
	res.status(200).send("Added: " + item);
});

app.get('/todo', function (req, res){
	console.log("get todo");
	console.log(todo);
	
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

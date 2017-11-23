var express = require('express');
var app = express();

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

app.listen(443, function () {
  console.log('Example app listening on port 8080!');
});

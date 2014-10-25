var express = require('express');
var load = require('express-load');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

load('models')
	.then('controllers')
	.then('routes')
	.into(app);

app.listen(3001, function () {
	console.log('Speak rodando em *:3001.');
});

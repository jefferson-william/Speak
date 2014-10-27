var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var methodOverride = require('method-override');
var error = require('./middlewares/error');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookieParser('Speak'));
app.use(expressSession());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));

load('models')
	.then('controllers')
	.then('routes')
	.into(app);

app.use(error.notFound);
app.use(error.serverError);

load('sockets')
	.into(io);

server.listen(3001, function () {
	console.log('Speak rodando em *:3001.');
});

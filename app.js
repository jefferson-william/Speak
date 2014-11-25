var config = require('./config.json');
var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var methodOverride = require('method-override');
var compression = require('compression');
var csurf = require('csurf');
var error = require('./middlewares/error');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var redisConnect = require('./libs/redis_connect');
var ExpressStore = redisConnect.getExpressStore();
var cookie = cookieParser(config.SECRET);
var store = new ExpressStore({
	client: redisConnect.getClient(),
	prefix: config.KEY
});
var redisAdapter = require('socket.io-redis');
var RedisStore = require('connect-redis')(expressSession);

app.disable('x-powered-by');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(compression());
app.use(cookie);
app.use(expressSession({
	secret: config.SECRET,
	name: config.KEY,
	resave: true,
	saveUninitialized: true,
	store: store
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public', {
	maxAge: config.CACHE
}));
app.use(csurf());
app.use(function (req, res, next) {
	res.locals._csrf = req.csrfToken();
	next();
});

io.adapter(redisAdapter(config.REDIS));

load('models')
	.then('controllers')
	.then('routes')
	.into(app);

app.use(error.notFound);
app.use(error.serverError);

io.use(function (socket, next) {
	var data = socket.request;
	cookie(data, {}, function (err) {
		var sessionID = data.signedCookies[config.KEY];
		store.get(sessionID, function (err, session) {
			if (err || !session) {
				return next(new Error('Acesso negado.'));
			} else {
				socket.handshake.session = session;
				return next();
			}
		});
	});
});

load('sockets')
	.into(io);

server.listen(3001, function () {
	console.log('Speak rodando em *:3001.');
});

module.exports = app;

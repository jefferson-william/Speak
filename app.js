var express = require('express');
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use('/', routes);
app.use('/usuarios/', users);

app.listen(3000, function () {
	console.log('Speak rodando em *:3000.');
});

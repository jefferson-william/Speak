module.exports = function (io) {
	var sockets = io.sockets;
	sockets.on('connection', function (client) {
		client.on('send-server', function (data) {
			var mensagem = '<b>' + data.nome + ':</b> ' + data.mensagem + '<br>';
			client.emit('send-client', mensagem);
			client.broadcast.emit('send-client', mensagem);
		});
	});
};

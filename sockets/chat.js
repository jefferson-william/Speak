module.exports = function (io) {
	var sockets = io.sockets;
	sockets.on('connection', function (client) {
		var session = client.handshake.session;
		var usuario = session.usuario;
		client.on('send-server', function (mensagem) {
			var mensagem = '<b>' + usuario.nome + ':</b> ' + mensagem + '<br>';
			client.emit('send-client', mensagem);
			client.broadcast.emit('send-client', mensagem);
		});
	});
};

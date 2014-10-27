
jQuery(document).ready(function ($) {

	var socket = io('http://localhost:3001');

	socket.on('send-client', function (mensagem) {
		var mensagens = $('#Chat').html();
		mensagens += mensagem;
		$('#Chat').html(mensagens);
	});

	$('#ChatForm').on('submit', function (event) {
		event.preventDefault();
		var mensagem = $('#ChatMensagem').val();
		socket.emit('send-server', mensagem);
		$('#ChatMensagem').val('');
	});

});

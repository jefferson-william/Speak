module.exports = function (app) {
	var ChatController = {
		index: function (req, res) {
			var params = {
				usuario: req.session.usuario,
				page: 'chat'
			};
			res.render('chat/index', params);
		}
	};
	return ChatController;
};

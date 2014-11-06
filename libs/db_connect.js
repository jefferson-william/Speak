module.exports = function () {
	var mongoose = require('mongoose');
	var env_url = {
		'test': 'mongodb://localhost/speak_test',
		'development': 'mongodb://localhost/speak'
	};
	var url = env_url[process.env.NODE_ENV || 'development'];
	return mongoose.connect(url);
};

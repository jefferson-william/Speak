module.exports = function () {
	var mongoose = require('mongoose');
	var config = require('../config.json');
	var env = process.env.NODE_ENV || 'development';
	var url = config.MONGODB[env];
	return mongoose.connect(url);
};

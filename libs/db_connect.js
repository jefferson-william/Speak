var mongoose = require('mongoose');
var config = require('../config.json');
var env = process.env.NODE_ENV || 'development';
var url = config.MONGODB[env];
var single_connection;

module.exports = function () {
	if (!single_connection) {
		single_connection = mongoose.connect(url);
	}
	return single_connection;
};

var redis = require('redis');
var redisStore = require('connect-redis');
var session = require('express-session');

exports.getClient = function () {
	return redis.createClient();
};

exports.getExpressStore = function () {
	return redisStore(session);
};
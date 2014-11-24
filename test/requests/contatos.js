var app = require('../../app');
var should = require('should');
var request = require('supertest')(app);

describe('No controller contatos', function () {
	describe('O usuario nao logado', function () {
		describe('deve voltar para /', function () {
			it('ao fazer GET /contatos/', function (done) {
				request.get('/contatos/').end(function (err, res) {
					res.headers.location.should.eql('/');
					done();
				});
			});
			it('ao fazer GET /contato/1/', function (done) {
				request.get('/contato/1/').end(function (err, res) {
					res.headers.location.should.eql('/');
					done();
				});
			});
			it('ao fazer GET /contato/1/editar/', function (done) {
				request.get('/contato/1/editar/').end(function (err, res) {
					res.header.location.should.eql('/');
					done();
				});
			});
			it('ao fazer POST /contato/', function (done) {
				request.get('/contato/1/editar/').end(function (err, res) {
					res.headers.location.should.eql('/');
					done();
				});
			});
			it('ao fazer DELETE /contato/1/', function (done) {
				request.del('/contato/1/').end(function (err, res) {
					res.headers.location.should.eql('/');
					done();
				});
			});
			it('ao fazer PUT /contato/1/', function (done) {
				request.put('/contato/1/').end(function (err, res) {
					res.headers.location.should.eql('/');
					done();
				});
			});
		});
	});
	describe('o usuario logado', function () {
		// Testes aqui
	});
});
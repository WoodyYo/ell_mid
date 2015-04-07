#!/usr/bin/env nodejs

var http = require('http');
var io = require('socket.io');
var url = require('url');
var fs = require('fs');
var addon = require('./build/Release/accelerator');

var server = http.createServer(function(request, response){
	console.log('Connection');
	response.writeHead(200, {'Content-Type': 'text/html'});

	fs.readFile("index.html", function(error, data) {
		if (error){
			response.writeHead(404);
			response.write("opps this doesn't exist - 404");
		} else {
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write(data, "utf8");
		}
		response.end();
	});
});
server.listen(8799);

var serv_io = io.listen(server);

serv_io.sockets.on('connection', function(socket) {
	while(true) {
		socket.emit('beet', {'type': 1});
		addon.accelerator();
	}
});

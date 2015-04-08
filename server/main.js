#!/usr/bin/env nodejs

var http = require('http');
var io = require('socket.io');
var url = require('url');
var fs = require('fs');
var pid = process.pid;
var sys = require('sys');

console.log(pid);

function puts(error, stdout, stderr) { sys.puts(stdout); }

require('child_process').exec('./kl25_sensors 0 /dev/ttyACM0 '+pid, puts);

var server = http.createServer(function(request, response){
	var filename = url.parse(request.url).pathname
	console.log('Connection');
	response.writeHead(200, {'Content-Type': 'text/html'});

	if(filename == '/') filename = '/index.html';
	fs.readFile("public"+filename, function(error, data) {
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
	//while(true) {
	//socket.emit('beet', {'type': 1});
	//console.log('haha');
	//while(wait);
	//wait = true;
	//}
});

process.on('SIGCHLD', function() {
	serv_io.sockets.emit('beet', {'type': 1});
	console.log('normal');
});

process.on('SIGHUP', function() {
	serv_io.sockets.emit('beet', {'type': 0});
	console.log('side');
});


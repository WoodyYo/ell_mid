var socket = io.connect('localhost:8799');
socket.on('beet', function(data){
	alert(data.type);
});


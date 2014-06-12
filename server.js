// simple socket chat server

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8888,function() {
	console.log("HTTP server listening on port 8888");
})

// routes

app.get("/",function(req,res) {
	res.sendfile(__dirname + '/index.html');
});


// socket stuff


io.on('connection',function(sock) {
	
	io.emit("sysMsg",{message:"a user has connected"});

	sock.on('chatMsg',function(data) {
		console.log("Chat message is incoming: %j",data);
		io.emit('newMsg',{message:data.message});
	});

	sock.on('disconnect',function() {
		io.emit("someone disconnected");
	});
});

// hi
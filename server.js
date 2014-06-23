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

app.get("*",function(req,res) {
	res.sendfile(__dirname + req.url );
});


// socket code


io.on('connection',function(sock) {
	

	sock.on('chatMsg',function(data) {
		console.log("Chat message is incoming: %j",data);
		io.emit('newMsg',{ type:"chat", user:data.user, message:data.message});
	});

	sock.on('newUser',function(data) {
		console.log("New user: %j",data);
		io.emit('newMsg',newMsgData("sys","system",data.user+" has joined this chat!"));
	});


	sock.on('disconnect',function() {
		console.log("User Left");
		io.emit('newMsg',newMsgData("sys","system","User has left this chat!"));
	});

	var newMsgData = function (type,user,body) {
		var data = {
			"type" : type,
			"user" : user,
			"message" : body
		};
		return data;
	}

});


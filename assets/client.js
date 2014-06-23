;(function(exports){ 


    /* setup */

    var user;

	var sock = io.connect('http://localhost:8888');
	var chat = new Messages();

	var setUser = document.getElementById('set');
	var userIn = document.getElementById('username');
	var sendMsg = document.getElementById('send');
	var messageIn = document.getElementById('m');

    /* Web Sockets */

	sock.on('hi', function (data) {
		chat.addToChat(data);
		console.log("received",data);
	});

	sock.on('newMsg', function (data) {
		chat.addToChat(data);
	});


	/* Chat window pane */

	function Messages() {
		this.msgs = document.getElementById('messages');
	}

	Messages.prototype.addToChat = function(data) {
		this.msgs.appendChild(this.addListItem(this.format(data)));
		this.msgs.scrollIntoView(false);
		console.log("received",data);		
	};

	Messages.prototype.addListItem = function (data) {
		var node=document.createElement("LI");
		var textnode=document.createTextNode(data);
		node.appendChild(textnode);
		return node;
	}

	Messages.prototype.format = function(data) {
		return (data.type == "sys") ?  data.message : data.user + ": " + data.message;
	}


	/* User */


	function User(name) {
		this.name = name;
	}


	/* add UI listeners */
	sendMsg.addEventListener('click',function(e) {
		if(messageIn.value.length > 0 ) {
			console.log("sending a message...");
			sock.emit('chatMsg',{ user:user.name,message:messageIn.value });
		}
	},false);	

	setUser.addEventListener('click',function(e) {
		if(userIn.value.length > 0 ) {
			user = new User(userIn.value);
			sock.emit('newUser',{user: user.name });
			document.getElementById('overlaybox').style.display='none';
			document.getElementById('overlaybg').style.display='none';
		}

	},false);	


})(this);

			


	
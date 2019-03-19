/*
	This node script is a server which is paired with a serial client script
	which when functioning together relay serial data from a single serial
	device to multiple clients.

	THIS SERVER GETS PUT ONTO DIGITAL OCEAN
	npm install socket.io into digital ocean directory
*/

var http = require('http');
var fs = require('fs');
var url =  require('url');

function handleIt(req, res) {
	console.log("The URL is: " + req.url);

	var parsedUrl = url.parse(req.url);
	console.log("They asked for " + parsedUrl.pathname);

	var path = parsedUrl.pathname;
	if (path == "/") {
		path = "index.html";
	}

	fs.readFile(__dirname + path,
		function (err, fileContents) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading ' + req.url);
			}
			res.writeHead(200);
			res.end(fileContents);
  		}
  	);

	console.log("Got a request " + req.url);
}


var httpServer = http.createServer(handleIt);

httpServer.listen(1025);
console.log('Server listening on port 1025');

var io = require('socket.io').listen(httpServer);

io.sockets.on('connection',
	function (socket) {
		console.log("We have a new client: " + socket.id);

		socket.on('click', function(data) {
			io.sockets.emit('click', data);
			console.log("RECEIVED CLICK");
		});

		socket.on('sensor', function(data) {
			console.log(data);
			io.sockets.emit("sensor", data);
		});
	}
);

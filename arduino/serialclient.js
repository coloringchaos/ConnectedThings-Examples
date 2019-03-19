/*

	This Node script requires node-serialport and socket.io-client to be installed with NPM
	It is meant to be run on a computer with an arduino or other serial device and relays data to a remote server for broadcasting

  THIS RUNS LOCALLLY
  npm install socket.io AND serialport into the local directory
*/

const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline')
// CHANGE TO YOUR SERIAL PORT
const serialPort = new SerialPort("YOUR-PORT", {
  baudRate: 9600
});

const parser = serialPort.pipe(new Readline({ delimiter: '\n' }))
var sensor = 0;

parser.on('data', data =>{
  sensor = data;
  console.log("sensor " + sensor);
});


serialPort.on("open", function () {
  console.log('open');

// CHANGE TO YOUR SERVER ADDRESS
  var socket = require('socket.io-client')('http://YOUR-IP:1025');
  socket.on('connect', function(){
  	 console.log("Socket COnnected");

     serialPort.on('data', function(){
       socket.emit('sensor', sensor);
     })

  }); //end socket.on
});

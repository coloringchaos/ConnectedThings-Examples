var myFillR;
var myFillG;
var myFillB;

function setup(){
	createCanvas(windowWidth, windowHeight);
	background('violet');

	myFillR = random(0, 255);
	myFillG = random(0, 255);
	myFillB = random(0, 255);
}

function draw(){
	var theX = mouseX;
	var theY = mouseY;

	stroke('violet');
	fill(myFillR, myFillG, myFillB);
	ellipse(theX, theY, 30, 30);
  
    //send it
  	sendmouse({ x: theX, y: theY, r: myFillR, g: myFillG, b: myFillB });
}


//send my drawing
function sendmouse(message){
	socket.emit('othermouse', message);
}

// draw ellipses for received drawings
function odraw(someX, someY, someR, someG, someB){
	fill(someR, someG, someB);
	ellipse(someX, someY, 20, 20);
}

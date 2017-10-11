var canvas = document.getElementById("cnv")
var cnv = canvas.getContext('2d');

var Height = canvas.height = 450;
var Width = canvas.width = 450;

var bgColor1 = 'rgb(220, 220, 220)';
var bgColor2 = 'rgb(190, 190, 190)';

var fps = 2;
var timeout = 1000/fps;

var snake = {

}

var apple = {

}

window.onload = function() {
	console.log("Working Fine");
	drawBackground();
	setInterval(gameLoop, timeout);
}

function draw(){
	
}

function update(){

}

function gameLoop(){
	draw();
	update();
}

function drawBackground(){
	for(var i = 0; i < 15; i++)
		for(var j = 0; j < 15; j++){
			if((i + j) % 2 == 0)
				cnv.fillStyle = bgColor1;
			else
				cnv.fillStyle = bgColor2;
			cnv.fillRect(i * 30, j * 30, (i + 1) * 30, (j + 1) * 30);
		}
}

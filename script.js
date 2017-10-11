var canvas = document.getElementById("cnv")
var cnv = canvas.getContext('2d');

var Height = canvas.height = 450;
var Width = canvas.width = 450;

var bgColor1 = 'rgb(220, 220, 220)';
var bgColor2 = 'rgb(190, 190, 190)';

var fps = 2;
var timeout = 1000/fps;

var snake = {

	head:{
		x: 6, // The X and Y are the position on the grid not on the canvas [0, 14]
		y: 6
	},

	color: 'black',
	direction: 1, // 1 is up, 2 is left, 3 is down, 4 is right
	length: 1,
	hash: new Array(15),
	queue:{
		x: [],
		y: []
	},

	draw(){
		for(var i = 0; i < this.queue.x.length; i++){
			cnv.fillStyle = this.color;
			cnv.fillRect(this.queue.x[i] * 30, this.queue.x[i] * 30, 30, 30);
		}
		cnv.fillStyle = 'white';
		cnv.fillRect(this.head.x * 30 + 10, this.head.x * 30 + 10, 10, 10);
	},

	update(){
	}
}

class Apple{
	constructor(x, y){ // The X and Y are the position on the grid not on the canvas [0, 14]
		this.x = x;
		this.y = y;
		this.color = 'red';
		this.size = 5;
	} 
	draw(){
		cnv.fillStyle = this.color;
		cnv.beginPath();
		cnv.arc(this.x * 30 + 15, this.y * 30 + 15, this.size, 0, 2 * Math.PI, false);
      	cnv.fill();
	}
}

window.onload = function() {
	console.log("Working Fine");
	init();
	setInterval(gameLoop, timeout);
}

function draw(){
	snake.draw();
}

function update(){

}

function gameLoop(){
	draw();
	update();
}

function init(){
	for(var i = 0; i < 15; i++)
		for(var j = 0; j < 15; j++){
			if((i + j) % 2 == 0)
				cnv.fillStyle = bgColor1;
			else
				cnv.fillStyle = bgColor2;
			cnv.fillRect(i * 30, j * 30, (i + 1) * 30, (j + 1) * 30);
		}
	// Initializing the grid
	for(var a = 0; a < 15; a++)
		snake.hash[a] = new Array(15);
	for(var a = 0; a < 15; a++){
		for(var b = 0; b < 15; b++){
			snake.hash[a][b] = false;
		}
	}
	snake.hash[snake.head.x][snake.head.x] = true;
	snake.queue.x.push(snake.head.x);
	snake.queue.y.push(snake.head.y);
}

var canvas = document.getElementById("cnv")
var cnv = canvas.getContext('2d');

var Height = canvas.height = 450;
var Width = canvas.width = 450;
cnv.textAlign = 'center';

var bgColor1 = 'rgb(220, 220, 220)';
var bgColor2 = 'rgb(190, 190, 190)';

var fps = 5;
var timeout = 1000/fps;
var stopId;

var apple;
var score = 0;

var snake = {

	head:{
		x: 6, // The X and Y are the position on the grid not on the canvas [0, 14]
		y: 6
	},

	color: 'black',
	direction: 3, // 0 is left 1 is up, 2 is right, 3 is down
	newDirection: 3,
	length: 1,
	hash: new Array(15),
	queue:{
		x: [],
		y: []
	},

	draw(){
		for(var i = 0; i < this.queue.x.length; i++){
			cnv.fillStyle = this.color;
			cnv.fillRect(this.queue.x[i] * 30, this.queue.y[i] * 30, 30, 30);
		}
		cnv.fillStyle = 'white';
		cnv.fillRect(this.head.x * 30 + 10, this.head.y * 30 + 10, 10, 10);
	},

	update(){

		var dif = this.direction - this.newDirection;
		if(dif < 0) dif *= -1;
		if(dif == 1 || dif == 3)
			this.direction = this.newDirection;

		if(this.direction == 0)
			this.head.x--;
		else if(this.direction == 1)
			this.head.y--;
		else if(this.direction == 2)
			this.head.x++;
		else if(this.direction == 3)
			this.head.y++;
		
		if(checkIfLost()){
			displayLoseInterface();
			clearInterval(stopId);
			return;
		}

		this.queue.x.push(this.head.x);
		this.queue.y.push(this.head.y);
		this.hash[this.head.x][this.head.y] = true;

		if(this.head.x != apple.x || this.head.y != apple.y){
			this.hash[this.queue.x[0]][this.queue.y[0]] = false;
			this.queue.x.shift();
			this.queue.y.shift();
		}else{
			updateApple();
			score++;
		}

	},

	updateDirecion(newDirection){
		this.newDirection = newDirection;
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

function updateApple(){
	var x = [];
	var y = [];
	for(var i = 0; i < 15; i++)
		for(var j = 0; j < 15; j++){
			if(!snake.hash[i][j]){
				x.push(i);
				y.push(j);
			}
		}
	var length = x.length;
	var i = Math.floor(Math.random() * length);
	apple = new Apple(x[i], y[i]);
}

function checkIfLost(){
	if(snake.head.x >= 15 || snake.head.x < 0 || snake.head.y >= 15 || snake.head.y < 0){
		clearInterval(stopId);
		displayLoseInterface();
		return true;
	}
	for(var i = 0; i < snake.queue.x.length; i++){
		if(snake.head.x == snake.queue.x[i] && snake.head.y == snake.queue.y[i]){
			return true;
		}
	}
	return false;
}

function displayLoseInterface(){
	cnv.font="60px Arial"; 
	cnv.fillText("YOU LOSE", 225, 225);
	cnv.font="30px Arial"; 
	cnv.fillText("Score: " + score, 225, 270);
}

window.onload = function() {
	console.log("Working Fine");
	initSnake();
	stopId = setInterval(gameLoop, timeout);
}

window.onkeydown = function(e){
	snake.updateDirecion(e.keyCode - 37);
}

function draw(){
	drawBackground();
	snake.draw();
	apple.draw();
}

function update(){
	snake.update();
}

function gameLoop(){
	draw();
	update();
	console.log('frame passed');
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

function initSnake(){
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
	updateApple();
}

const UP = 0; const DOWN = 2;
const LEFT = 1; const RIGHT = 3;

const PAUSE = 0; const PLAY = 1;

var gameState = PAUSE;
var cheats = true;

var snake;
var interval = 10;
var score = 0;

var size = 25;
var food = new v2(0, 0);

function setup() {
  let canvas = createCanvas(windowWidth - 4, windowHeight - 4);
  snake = new snek(interval);
  background(0, 100, 0);
  
  canvas.mouseClicked(function(){
    if(gameState == PAUSE){
      gameState = PLAY;
    }
  });
}


function draw() {
  background(0, 100, 0);
  
  if(gameState == PAUSE){
    paused();
  }else{
    game();
  }
}

function paused(){
  //UI
  textAlign(CENTER);
  fill(255);
  stroke(255);
  strokeWeight(5);
  textSize(100);
  text("Snake!", width/2, height/2 - 250);
  strokeWeight(2);
  textSize(50);
  text("click the anywhere to start", width/2, height/2);
  strokeWeight(0.5);
  textSize(25);
  text("use WASD or Arrow Keys to play", width/2, height/2 + 150);
}

function game(){
  //UI
  textAlign(LEFT);
  fill(255);
  stroke(255);
  strokeWeight(1);
  textSize(50);
  text(score, width - 25 - 25 * ((score == 0) ? 1 : int(log(score)/log(10)) + 1), 50);
  
  //food
  fill(200, 100, 100);
  noStroke();
  ellipse(food.x, food.y, size/2, size/2);
  if(snake.headCollision(food.x, food.y)){
     snake.eat();
     score++;
     food = genV2();
  }
  if(food.x == 0 && food.y == 0){
     food = genV2();
  }
   
  snake.update();
  if(snake.dead()){
    reset();
  }
}

function genV2(){
  do
  {
    pos = generate();
  }
  while(snake.contains(pos.x, pos.y));
  return pos;
}

function generate(){
  return new v2(int(random(2, int(width / interval) - 2)) * interval, int(random(2, int(height / interval) - 2)) * interval);
}

function keyPressed(){
  if(gameState == PLAY){
    snake.keyCodeTrigger(keyCode, cheats);
  }
}

function reset(){
  food = new v2(0, 0);
  score = 0;
  snake.reset();
  gameState = PAUSE;
}

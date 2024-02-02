const UP = 0; const DOWN = 2;
const LEFT = 1; const RIGHT = 3;

var size = 25;
var speed = -1;
var spdVal = 1;
var consumption = 25;
var weight = 25;
var x = 500;
var y = 500;
var direction = LEFT;
var intention = LEFT;

var parts = [];

var food = new v2(0, 0);
var cheats = false;

var score = 0;

function setup() {
  createCanvas(windowWidth - 4, windowHeight - 4);
  background(0, 100, 0);
  parts.push(new section(new v2(x,y)));
}


function draw() {
  background(0, 100, 0);
  
  fill(255);
  stroke(255);
  strokeWeight(1);
  textSize(50);
  text(score, width - 25 - 25 * ((score == 0) ? 1 : int(log(score)/log(10)) + 1), 50);
  console.log()

  fill(200, 100, 100);
  noStroke();
  ellipse(food.x, food.y, size/2, size/2);
  if(x == food.x && y == food.y){
     eat();
     food = genV2();
   }
   if(food.x == 0 && food.y == 0){
     food = genV2();
   }
   
   //snake movement
   if(direction % 2 == 0)
   {
      y += speed;
      //print(x, y, '\n');
   }
   else
   {
      x += speed; 
      //print(x, y, '\n');
   }
   
   //snake head update
   parts[0].setDest(x,y);
   //snake tail update
   if(consumption == 0)
   {
     parts[parts.length - 1].move();
   }
   else
   {
     consumption--;
   }
   
   //updates rendering
   for(var i = 0; i < parts.length; i++){
     parts[i].update();
   }
   
   //updates everything after entering a "tile"
   if(x % 25 == 0 && y % 25 == 0){
     //adds segment on turns
     if(direction != intention){
       part = new section(new v2(x,y));
       parts.splice(0, 0, part);
       //prepares for new movement values
       direction = intention;
       speed = spdVal;
       if(direction == UP || direction == LEFT){
         speed *= -1;
       }
     }
     
     //removes end segment if no longer needed
     if(parts[parts.length - 1].finished()){
       parts.pop();
     }
     //print(coords.get(0).x, coords.get(0).y, '\n');
   }
}

function eat(){
  consumption += weight;
  score++;
}

function genV2(){
  pos = generate();
  for(var i = 0; i < parts.length; i++){
    if(parts[i].contains(pos.x, pos.y)){
      pos = generate();
      i = 0;
    }
  }
  return pos;
}

function generate(){
  return new v2(int(random(2, int(width / 25) - 2)) * 25, int(random(2, int(height / 25) - 2)) * 25);
}

function keyPressed(){
  if(direction % 2 == 0)
  {
    if(keyCode == LEFT_ARROW)
    {
      intention = LEFT;
    }
    else if(keyCode == RIGHT_ARROW)
    {
      intention = RIGHT;
    }
  }
  else
  {
    if(keyCode == UP_ARROW)
    {
      intention = UP;
    }
    else if(keyCode == DOWN_ARROW)
    {
      intention = DOWN;
    }
  }
  if(cheats){
    if(keyCode == 32)
    {
      eat();
    }
  }
  //console.log(intention);
}

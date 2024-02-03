class snek{
  
  spdVal = 1;
  
  setResetPos = function(){
    this.x = int(width/2);
    this.x = this.x - (this.x%this.interval);
    this.y = int(height/2);
    this.y = this.y - (this.y%this.interval);
  }
  
  constructor(interval){
    this.interval = interval;
    
    this.setResetPos();
    
    this.direction = LEFT;
    this.intention = LEFT;
    this.speed = -1;
    
    this.consumption = this.interval * 2;
    
    this.parts = [];
    this.parts.push(new section(new v2(this.x,this.y)));
  }
  
  update(){
    //snake movement
    if(this.direction % 2 == 0)
    {
       this.y += this.speed;
       //print(x, y, '\n');
    }
    else
    {
       this.x += this.speed; 
       //print(x, y, '\n');
    }
    
    //snake head update
    this.parts[0].setDest(this.x,this.y);
    //snake tail update
    if(this.consumption == 0)
    {
      this.parts[this.parts.length - 1].move();
    }
    else
    {
      this.consumption--;
    }
    
    //updates rendering
    for(var i = 0; i < this.parts.length; i++){
      this.parts[i].update();
    }
    
    //updates everything after entering a "tile"
    if(this.x % this.interval == 0 && this.y % this.interval == 0){
       
       //adds segment on turns
       if(this.direction != this.intention){
         var part = new section(new v2(this.x,this.y));
         this.parts.splice(0, 0, part);
         
         //prepares for new movement values
         this.direction = this.intention;
         this.speed = this.spdVal;
         if(this.direction == UP || this.direction == LEFT){
           this.speed *= -1;
         }
       }
       
       //removes end segment if no longer needed
       if(this.parts[this.parts.length - 1].finished()){
         this.parts.pop();
       }
    }
  }
  
  headCollision(Nx, Ny){
    return Nx == this.x && Ny == this.y;
  }
  
  kCode(val){
    return (val).charCodeAt(0);
  }
  
  keyCodeTrigger(keyVal, cheats){
    console.log(keyVal);
    if(this.direction % 2 == 0)
    {
      if(keyVal == LEFT_ARROW || keyVal == this.kCode('a') || keyVal == this.kCode('A'))
      {
        this.intention = LEFT;
      }
      else if(keyVal == RIGHT_ARROW || keyVal == this.kCode('d') || keyVal == this.kCode('D'))
      {
        this.intention = RIGHT;
      }
    }
    else
    {
      if(keyVal == UP_ARROW || keyVal == this.kCode('w') || keyVal == this.kCode('W'))
      {
        this.intention = UP;
      }
      else if(keyVal == DOWN_ARROW || keyVal == this.kCode('s') || keyVal == this.kCode('S'))
      {
        this.intention = DOWN;
      }
    }
    if(cheats){
      if(keyVal == 32)
      {
        this.eat();
      }
    }
  }
  
  eat(){
    this.consumption += this.interval;
  }
  
  contains(Nx, Ny){
    for(var i = 0; i < this.parts.length; i++){
      if(this.parts[i].contains(Nx, Ny)){
        return true;
      }
    }
    return false;
  }
  
  reset(){
    this.parts = [];
    this.consumption = this.interval * 2;
    this.setResetPos();
    this.direction = LEFT;
    this.intention = LEFT;
    this.parts.push(new section(new v2(this.x,this.y)));
  }
  
  dead(){
    return this.x < 0 || this.x > width || this.y < 0 || this.y > height
  }
}

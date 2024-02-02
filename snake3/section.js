class section{
  
  constructor(des){
    this.speed = 1;
    this.size = 12.5;
    this.head = new v2(des.x, des.y);
    this.tail = new v2(des.x, des.y);
  }
  
  setDest(Nx, Ny){
    this.head.x = Nx;
    this.head.y = Ny;
  }
  
  update(){
    stroke(0, 200, 0);
    strokeWeight(this.size);
    line(this.head.x, this.head.y, this.tail.x, this.tail.y);
  }
  
  move(){
    if(this.head.x - this.tail.x == 0)
    {
      this.tail.y += this.tail.y - this.head.y > 0 ? -this.speed : this.speed;
    }
    else
    {
      this.tail.x += (this.tail.x - this.head.x == 0 ? 0 : 1) * (this.tail.x - this.head.x > 0 ? -this.speed : this.speed);
    }
  }
  
  contains(otherX, otherY){
    var xCheck = ((this.head.x > this.tail.x) ? (otherX <= this.head.x && otherX >= this.tail.x) : (otherX >= this.head.x && otherX <= this.tail.x));
    var yCheck = ((this.head.y > this.tail.y) ? (otherY <= this.head.y && otherY >= this.tail.y) : (otherY >= this.head.y && otherY <= this.tail.y));
    return xCheck && yCheck;
  }
  
  finished(){
    return this.head.x == this.tail.x && this.head.y == this.tail.y;
  }
}

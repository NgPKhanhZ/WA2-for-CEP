class Zone{
  constructor(x, y, hei, wid){
    this.xPos = x;
    this.yPos = y;
    this.hei = hei;
    this.wid = wid;
  }
  
  contains(mover){
    return abs(mover.pos.x - this.xPos) <= this.wid / 2 && abs(mover.pos.y - this.yPos) <= this.hei / 2;
  }
  
  applyEffect(mover){
      mover.vel.mult(0.97);
  }
  
  show(){
    rectMode(CENTER);
    strokeWeight(0);
    fill(0, 255, 255, 63);
    rect(this.xPos, this.yPos, this.wid, this.hei);
  }
}
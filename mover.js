class Mover {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.setMag(0.1);
    this.acc = createVector(0, 0);
    this.mass = m;
    this.r = sqrt(this.mass) * 2;
  }
  
  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }
  
  update() {
    strokeWeight(2);
    stroke("purple");
    //line(this.pos.x, this.pos.y, this.pos.x + this.acc.x * this.mass * 100, this.pos.y + this.acc.y * this.mass * 100);
    strokeWeight(2);
    stroke("blue");
    //line(this.pos.x, this.pos.y, this.pos.x + this.vel.x * 100, this.pos.y + this.vel.y * 100);
    
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }
  
  reduceMove(x) {
    this.vel.mult(x);
    this.acc.mult(x);
  }
  
  show() {
    strokeWeight(0);
    fill("gray");
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}
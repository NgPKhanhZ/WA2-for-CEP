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
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }
  
  multMove(x) {
    this.vel.mult(x);
    this.acc.mult(x);
  }
  
  show() {
    noStroke();
    fill("gray");
    ellipse(this.pos.x, this.pos.y, this.r * 2);
    textSize(8);
    //textAlign(CENTER, CENTER);
    //text("🌑", this.pos.x, this.pos.y);
  }
}
class BlackHole {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.mass = m;
    this.r = sqrt(this.mass); 
    this.eventHorizon = this.r * 4;
   }

  attract(mover, index) {
    let force = p5.Vector.sub(this.pos, mover.pos);
    //if (force.mag() <= 10){
      //movers = movers.splice(index, 1);
  //  } else
    if (force.mag() <= this.eventHorizon){
      mover.reduceMove(0.5);
      mover.applyForce(force); 
    } else if (force.mag() <= 500) {
      let distanceSq = constrain(force.magSq(), 100, 1000);
      let strength = G * (this.mass * mover.mass) / distanceSq;
      force.setMag(strength);
      mover.applyForce(force);
    }
  }

  show() {
    noStroke();
    fill(0);  
    ellipse(this.pos.x, this.pos.y, this.r);
  }
}
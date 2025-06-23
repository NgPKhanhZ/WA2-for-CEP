class BlackHole {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.mass = m;
    this.r = sqrt(this.mass); 
    this.eventHorizon = this.r * 3.5;
   }

  attract(mover, index) {
    let force = p5.Vector.sub(this.pos, mover.pos); //direction of force
    if (force.mag() <= 10){ 
      if (chaosMode){
        mover.pos.set(sun.pos); //moves it to the white hole
      } else {
        movers.splice(index, 1); //eats it up
        this.r += 0.01;
        this.mass += 0.01;
      }
    } else if (force.mag() <= this.eventHorizon){ //close enough to be sucked in
      mover.multMove(0.5);
      mover.applyForce(force); 
    } else if (force.mag() <= 70 * this.r) {
      let distanceSq = constrain(force.magSq(), 100, 1000);
      let strength = G * (this.mass * mover.mass) / distanceSq;
      force.setMag(strength);
      mover.applyForce(force);
    }
    this.eventHorizon = this.r * 3.5; //in case size increases
  }

  show() {
    strokeWeight(1);
    stroke("orange");
    fill(0);  
    ellipse(this.pos.x, this.pos.y, this.r);
  }
}
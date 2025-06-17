let movers = [];
let attractor;
let G = 5;

function setup() {
  createCanvas(1000, 600);
  for (let i = 0; i < 8; i++) {
    let x = random(width/2) + width/4;
    let y = random(height/2) + height/4;
    let m = random(5, 10);
    movers[i] = new Mover(x, y, m); //(x, y, m)
  }
  sun = new Attractor(width, height / 2, 100); 
  sun.r = 100;
  blackHole = new BlackHole(width / 4, height / 2, 100);
  background(0);
}

function draw() {
  background(200);
  for (let i = 0; i < movers.length; ++i) {
    movers[i].update();
    movers[i].show();
    sun.attract(movers[i]);
    blackHole.attract(movers[i], i);
  }
  if (mouseIsPressed){
    blackHole.pos.x = mouseX;
    blackHole.pos.y = mouseY;
  }
  sun.show("orange");
  blackHole.show();
}
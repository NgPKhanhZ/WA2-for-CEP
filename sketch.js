let movers = [];
let attractor;
let G = 5;
let seed;
let zone1, zone2; //zone will only be for chaos mode because it is too wack
let chaosMode = false; 
let bgColor = 200;
let spawnTimer = 0; //spawns particles in chaos mode
let uiShow = false; //ui toggle
let repellant1, repellant2, repellant3; 

function setup() {
  rectMode(CENTER);
  
  //pick seed
  seed = random(10) * random(10);
  randomSeed(seed);
  createCanvas(1000, 600);
  
  for (let i = 0; i < 8; i++) {
    let x = random(width/2) + width/4;
    let y = random(height/2) + height/4;
    let m = random(5, 10);
    movers[i] = new Mover(x, y, m); 
  }
  
  sun = new Attractor(width, height / 2, 100); 
  sun.r = 100;
  blackHole = new BlackHole(width / 4, height / 2, 100);
  zone1 = new Zone(width/4, height/2, 10000000000, 100);
  zone2 = new Zone(width/4*3, height/2, 10000000000, 100);
  repellant1 = new Attractor(width/4, height/2, 100);
  repellant1.mass *= -1; //makes it repel
  repellant2 = new Attractor(width/4*2, height/2, 100);
  repellant2.mass *= -1;
  repellant3 = new Attractor(width/4*3, height/2, 100);
  repellant3.mass *= -1;
}

function draw() {
  background(bgColor);
  for (let i = 0; i < movers.length; ++i) {
    movers[i].update();
    movers[i].show();
    sun.attract(movers[i]);
    
    if (chaosMode){
      if (zone1.contains(movers[i])) zone1.applyEffect(movers[i]);
      if (zone2.contains(movers[i])) zone2.applyEffect(movers[i]);
      if (abs(movers[i].pos.x - repellant1.pos.x) <= 200 && abs(movers[i].pos.y - repellant1.pos.y) <= 200) repellant1.attract(movers[i]);
      if (abs(movers[i].pos.x - repellant2.pos.x) <= 200 && abs(movers[i].pos.y - repellant2.pos.y) <= 200) repellant2.attract(movers[i]);
      if (abs(movers[i].pos.x - repellant3.pos.x) <= 200 && abs(movers[i].pos.y - repellant3.pos.y) <= 200) repellant3.attract(movers[i]);
    }
    
    blackHole.attract(movers[i], i); //at end because the blackhole eating stuff can give errors
  }
  
  if (mouseIsPressed){ //moves blackhole
    blackHole.pos.x = mouseX;
    blackHole.pos.y = mouseY;
  }
  
  if (chaosMode) {
    sun.show("white");
    zone1.show();
    zone2.show();
    repellant1.show("blue");
    repellant2.show("blue");
    repellant3.show("blue");
  }
  else {
    sun.show("orange");
  }
  
  blackHole.show();
  
  if (chaosMode && spawnTimer >= 2000){
    let m = random(5, 10);
    movers[movers.length] = new Mover(sun.pos.x, sun.pos.y, m);
    spawnTimer -= 2000;
  } else {
    spawnTimer += deltaTime;
  }
  
  if(keyIsDown(83)){ //spawns particles, key s
    let x = random(width/2) + width/4;
    let y = random(height/2) + height/4;
    let m = random(5, 10);
    movers[movers.length] = new Mover(x, y, m);
  }
  
  if (uiShow){ //ui toggle
    noStroke();
    fill("red");
    textSize(13);
    text("Number of particles: " + movers.length +"\nChaos Mode: " + chaosMode, 5, 15);
  }
}

function keyPressed(){
  if (key == "r"){ //restart seed
    movers = [];
    randomSeed(seed);
    createCanvas(1000, 600);
    
    for (let i = 0; i < 8; i++) {
      let x = random(width/2) + width/4;
      let y = random(height/2) + height/4;
      let m = random(5, 10);
      movers[i] = new Mover(x, y, m); 
    }
    
    sun = new Attractor(width, height / 2, 100); 
    sun.r = 100;
    blackHole = new BlackHole(width / 4, height / 2, 100);
  } else if (key == "n"){ //new seed
    
    //pick seed
    randomSeed(millis() + deltaTime);
    seed = random(10) * random(10);
    randomSeed(seed);
    createCanvas(1000, 600);
    
    movers = [];
    for (let i = 0; i < 8; i++) {
      let x = random(width/2) + width/4;
      let y = random(height/2) + height/4;
      let m = random(5, 10);
      movers[i] = new Mover(x, y, m); 
    }
    
    sun = new Attractor(width, height / 2, 100); 
    sun.r = 100;
    blackHole = new BlackHole(width / 4, height / 2, 100);
    background(0);
  } else if (key == "c"){
    if (chaosMode){
      chaosMode = false;
      bgColor = 200;
    } else {
      chaosMode = true;
      bgColor = 160;
    }
  } else if (keyCode == 32){ //ui toggle, spacebar
    if (uiShow) uiShow = false;
    else uiShow = true;
  }
}
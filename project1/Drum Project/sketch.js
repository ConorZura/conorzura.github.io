var pads = [[]];
var play;
var snare;
var kick;
var highHat;
var symbol;
var tambourine;
var sounds = [];
var currentColumn = 1;
var hasPlayedColumn = false;
lastPlayedTime = 0;

function setup() {
  createCanvas (600, 600);
  kick = loadImage ("118259-200.png");
  snare = loadImage ("252979-200.png");
  highHat = loadImage ("img_495187.png");
  symbol = loadImage ("cymbal-512.png");
  tambourine = loadImage ("88562-tambourine.png");
  sounds[1] = loadSound('kickDrum.wav');
  sounds[2] = loadSound('snare.wav');
  sounds[3] = loadSound('hiHat.wav');
  sounds[4] = loadSound('cymbal.wav');
  sounds[5] = loadSound('tambourine.wav');

  for (var x = 0; x<10; x++){
    pads[x] = [];
    for (var y = 0; y<6; y++){
      pads[x][y]= new BeatPad(x,y);
    }
  }
  play = new PlayButton();
  rand = new RandomButton();
}

function draw(){
  background(255);
  for (var x = 0; x<10; x++){
    for (var y = 0; y<6; y++){
      pads[x][y].display();
      pads[x][y].lightUp();
    }
  }
  image(kick, 0, 50, 60, 50);
  image(snare,0,100,60,50);
  image(highHat,2,152,56,46);
  image(symbol,0,200,60,50);
  image(tambourine,2,252,56,46);
  topBar()
  play.growth();
  play.display();
  rand.display();
  rand.growth();
  moveColumn();
  //rand.rand2();
}

function BeatPad(x, y){
  this.x = x*60;
  this.y = y*50;
  this.hasBeenClicked = false;
  this.display = function(){
    fill (140);
    stroke(0);
    rect (this.x, this.y, 600/10, 600/12);
    noStroke();
    if (this.hasBeenClicked == true){
      fill (0);
      ellipse (this.x + 30, this.y + 25, 25);
    }
  }

  this.lightUp = function (){
    if (mouseX > this.x && mouseX < this.x+(600/10) && mouseY > this.y && mouseY < this.y+50){
      fill (175);
      rect (this.x+1, this.y+1, 600/10, 600/12);
      if (this.hasBeenClicked == true){
        fill(0);
        ellipse (this.x +30, this.y + 25, 25);
      }
    }
  }

  this.checkClick = function() {
    // checks if mouseX and mouseY are over this particular pad
    if (mouseX > this.x && mouseX < this.x+(600/10) && mouseY > this.y && mouseY < this.y+50 && mouseX > 60 && mouseY>50){
      if (this.hasBeenClicked == false){
        this.hasBeenClicked = true;
      }
      else if (this.hasBeenClicked == true){
        this.hasBeenClicked = false;
      }
    }
  }
}

function playColumn(num) {
  hasPlayedColumn = true;
  console.log (play.hasBeenClicked);
  if (play.hasBeenClicked == true){
    for (var i = 0; i < 6; i++){
      if (pads[num][i].hasBeenClicked == true){
        sounds[i].play();
      }
    }
  }
}
function moveColumn(){
  if (millis()-lastPlayedTime > 200){
    lastPlayedTime = millis();
    currentColumn++;
    hasPlayedColumn = false;
    if (currentColumn == 10){
      currentColumn = 1;
    }
    playColumn(currentColumn);
  }
}

function randomizeBeatPads() {
  // for loop that randomly sets certain pads to on or off
  for (var x = 1; x<10; x++){
    for (var y = 1; y<6; y++){
      pads [x][y].hasBeenClicked = random([true,false])
    }
  }
  console.log("randomizing buttons!");
}

function mouseClicked (){
  for (var x = 1; x<10; x++){
    for (var y = 0; y<6; y++){
      pads[x][y].checkClick();
    }
  }
  play.checkClick();
  rand.checkClick();
}

function PlayButton(){
  this.x = 550;
  this.y = 5;
  this.w = 40;
  this.hasBeenClicked = false;
  this.display = function(){
    fill (0,255,0);
    rect (this.x, this.y, this.w, this.w);
    triangle (555, 10, 585, 25, 555, 40);
  }
  this.checkClick = function (){
    // checks if mouse is over play button
    if (mouseX > this.x && this.x+40 > mouseX && mouseY > this.y && this.y+40 > mouseY){
      if (this.hasBeenClicked == false){
        this.hasBeenClicked = true;
      }
      else if (this.hasBeenClicked == true){
        this.hasBeenClicked = false;
      }
    }
  }
  this.playBeat = function (){
    if (this.hasBeenClicked == true){
      thisBeat++;
    }
    else if (this.hasBeenClicked == false){
      thisBeat = 60;
    }
  }

  // makes button bigger when mouse is over
  this.growth = function(){
    if (mouseX > this.x && this.x+40 > mouseX && mouseY > this.y && this.y+40 > mouseY){
      this.x = 549;
      this.y = 4;
      this.w = 42;
    }
    else {
      this.x = 550;
      this.y = 5;
      this.w = 40;
    }
  }
}

function RandomButton(){
  this.x = 10;
  this.y = 5;
  this.w = 40;
  this.hasBeenClicked = false;
  this.display = function (){
    fill (0,0,255);
    rect (this.x,this.y,this.w,this.w);
    fill (255);
    textSize (46);
    text ("R", 12, 43);
  }
  this.growth = function (){
    if (mouseX > this.x && this.x+40 > mouseX && mouseY > this.y && this.y+40 > mouseY){
      this.x = 9;
      this.y = 4;
      this.w = 42;
    }
    else {
      this.x = 10;
      this.y = 5;
      this.w = 40;
    }
  }
  this.checkClick = function (){
    if (mouseX > this.x && this.x+40 > mouseX && mouseY > this.y && this.y+40 > mouseY){
      randomizeBeatPads();
    }
  }
  this.rand2 = function (){
    if (this.hasBeenClicked == true){
      console.log ("clicked");
    }
  }
}

// generates white bar at top of beat maker
function topBar(){
  fill (255);
  stroke (0);
  rect (0,0,599,50);
  fill (0);
  textSize (50);
  text ("Ultimate Beat Maker", 75,40);
}

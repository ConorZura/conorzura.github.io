var pads = [];
var play;
var snare;
var kick;
var highHat;
var symbol;
var tambourine;

function setup() {
  createCanvas (600, 600);
  kick = loadImage ("118259-200.png");
  snare = loadImage ("252979-200.png");
  highHat = loadImage ("img_495187.png");
  symbol = loadImage ("cymbal-512.png");
  tambourine = loadImage ("88562-tambourine.png");
  for (var y = 0; y<6; y++){
    for (var x = 0; x<10; x++){
      pads[y*10+x]= new BeatPad(x,y);
    }
  }
  play = new PlayButton();
}

function draw(){
  background(255);
  for (var i = 0; i<pads.length; i++){
    pads[i].display();
    pads[i].lightUp();
  }
  image(kick, 0, 50, 60, 50);
  image(snare,0,100,60,50);
  image(highHat,2,152,56,46);
  image(symbol,0,200,60,50);
  image(tambourine,2,252,56,46);
  topBar()
  play.growth();
  play.display();
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
  this.select = function (){
    if (selectValue == 140){
      selectValue = 0;
    }
    else{
      selectValue = 140;
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


function mouseClicked (){
  for (var i = 0; i < pads.length; i++) {
    pads[i].checkClick();
  }
  play.checkClick();
}

function PlayButton(){
  this.x = 550;
  this.y = 5;
  this.w = 40;
  this.hasBeenClicked = false;
  this.display = function(){
    fill (0,255,0);
    rect (this.x, this.y, this.w, this.w);
    triangle (this.x + 5, this.y + 5, this.x+35, this.y+20, this.x+5, this.y+35);
  }
  this.checkClick = function (){
    // checks if mouse is over play button
    if (mouseX > this.x && this.x+40 > mouseX && mouseY > this.y && this.y+40 > mouseX){
      if (this.hasBeenClicked == false){
        this.hasBeenClicked = true;
      }
      else if (this.hasBeenClicked == true){
        this.hasBeenClicked = false;
      }
    }
  }

  // makes button bigger when mouse is over
  this.growth = function(){
    if (mouseX > this.x && this.x+40 > mouseX && mouseY > this.y && this.y+40 > mouseY){
      this.x = 549;
      this.y = 4;
      this.w = 41;
      console.log (" button should be bigger");
    }
    else {
      this.x = 550;
      this.y = 6;
      this.w = 40;
    }
  }
}

function randomButton (){
  // button design
  fill (0,0,255);
  rect (10,5,40,40);
  fill (255);
  textSize (46);
  text ("R", 12, 43);
  //grows button when mouse is over
  if (checkMousePositionR === true){
    fill (0,0,255);
    rect (9,4,42,42);
    fill (255);
    textSize (48);
    text ("R", 11, 44);
  }
}


// generates white bar at top of beat maker
function topBar(){
  fill (255);
  stroke (0);
  rect (0,0,599,50);
}

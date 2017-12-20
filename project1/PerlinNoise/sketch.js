var inc = 0.005;
var start = 0;

function setup(){
  createCanvas (400,400);
  colorMode(HSB);
}

function draw(){
  background(240,100,100);
  sun();
  stroke(255);
  noFill();
  var xoff = start;
  beginShape();
  for (var x = 0; x < width; x++){
    var y = noise(xoff) * (height);
    stroke(x,255,255);
    line(x, y, x, height);
    vertex (x,y);
    xoff += inc;
  }
  // for (var x = 0; x < width; x++){
  //   var y = noise(xoff) * height;
  //   stroke(255);
  //   vertex (x,y);
  //   xoff += inc;
  // }
  endShape();
  start += inc;
}

function sun(){
  fill (60,100,100);
  noStroke();
  ellipse (22,22,75);
}

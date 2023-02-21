var stepSize = 20;

function setup() {
  createCanvas(500, 500);
}
///////////////////////////////////////////////////////////////////////
function draw() {
  background(125);

  colorGrid();
  compassGrid();
}
///////////////////////////////////////////////////////////////////////
function colorGrid(){
    noStroke();
    let green = color(0, 255, 0);
    let blue = color(0, 0, 255);  
    for(var x=0;x<25;x++){
        for(var y=0;y<25;y++){
            var posX = x * stepSize;
            var posY = y * stepSize;
            var scale = 0.002;
            var rX = (posX+frameCount)*scale;
            var rY = (posY+frameCount)*scale;       
            var r = noise(rX,rY,frameCount/mouseX);
            var c = lerpColor(green,blue,r);
            fill(c);
            rect(posX,posY,stepSize,stepSize);
        }
    }
}
///////////////////////////////////////////////////////////////////////
function compassGrid(){
  for(var x=1;x<=25;x++){
        for(var y=0;y<=25;y++){
            stroke(0);
            strokeWeight(2);
            push();
            var m = map(mouseX,0,width,10,2);
            var posX = x*stepSize;
            var posY = y*stepSize;
            var scale = 0.002;
            var nX = (posX+frameCount)*scale*m;
            var nY = (posY+frameCount)*scale*m;
            var n = noise(nX,nY);
            var r = map(n,0,1,0,720);
            var length = map(n,0,1,-10,10);
            translate(x*stepSize-stepSize/2,y*stepSize+stepSize/2);
            rotate(radians(r));
            line(0,stepSize/3+length,0,-stepSize/3);
            pop();
        }  
  }
}


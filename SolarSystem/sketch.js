var speed;
var starLocs = [];

function setup() {
    createCanvas(900, 700);
}

function draw() {
    background(0);
    speed = frameCount;
    
    //SUN  
    translate(width/2, height/2);
    rotate(radians(speed)/3);
    celestialObj(color(255,150,0), 200);
       
    //EARTH   
    rotate(radians(speed));
    translate(300,0);
    
    rotate(radians(speed));
    celestialObj(color('rgb(0,0,255)'), 80);
        
    //MOON
    push();    
    rotate(radians(speed*-4));   
    translate(100,0);
    celestialObj(color(255,255,255), 30);    
     
    rotate(radians(speed*6));  
    translate(30,0);
    celestialObj(color(255,255,255),20 );
    pop(); 
       
}

function celestialObj(c, size){
    strokeWeight(5);
    fill(c);
    stroke(0);
    ellipse(0, 0, size, size);
    line(0, 0, size/2, 0);
}



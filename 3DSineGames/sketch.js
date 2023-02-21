var confLocs;
var confTheta;
var slider;

function setup() {
    createCanvas(900, 800, WEBGL);
    camera(800,-600,800,0,0,0,0,1,0);
    confLocs = [];
    confTheta = [];
    
    for (var i = 0; i < 200; i++){
        random(-500,500);
        var x = random(-500,500);
        var y = random(-800,0);
        var z = random(-500,500);
        confLocs.push(createVector(x,y,z));
        confTheta.push(random(0,360));
    }
    slider = createSlider(0,50,0,0);
}

function draw() {
    background(125);
    angleMode(DEGREES);
    
    var xLoc = cos(frameCount)* height;
    var zLoc = sin(frameCount)* height;
    camera(xLoc,-600,zLoc,0,0,0,0,1,0);
    
    for (var x = -400; x < 400; x+=50){
        for (var z = -400; z< 400; z+=50){
            push();
            var distance = dist(0,0,x,z) + frameCount;
            var length = (map(sin(distance+frameCount*(slider.value())),-1,1,100,300));
            translate(x,0,z);
            box(50,length,50);
            pop();
        }        
    }
    
    normalMaterial();
    confetti();
    stroke(0);
    strokeWeight(2);
    
}

function confetti(){
    for (var i=0; i < confLocs.length; i++){
        push();
        translate(confLocs[i].x,confLocs[i].y,confLocs[i].z);
        rotateX(confTheta[i]);
        plane(15,15);
        confLocs[i].y +=1;
        confTheta[i]+=10;
        
        //check if y is greater than 0 , if yes set to -800
        if(confLocs[i].y > 0){
            confLocs[i].y = -800;
        }
        pop();
    }
}

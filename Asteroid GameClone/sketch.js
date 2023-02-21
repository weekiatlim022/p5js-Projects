var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];

//////////////////////////////////////////////////
function setup() {
  createCanvas(1200,800);
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();

  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width/2, height*2.9);
  atmosphereSize = new createVector(width*3, width*3);
  earthLoc = new createVector(width/2, height*3.1);
  earthSize = new createVector(width*3, width*3);
}

//////////////////////////////////////////////////
function draw() {
  background(0);
  sky();

  spaceship.run();
  asteroids.run();

  drawEarth();

  checkCollisions(spaceship, asteroids); // function that checks collision between various elements
  score();
}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth(){
  noStroke();
  //draw atmosphere
  fill(0,0,255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x,  atmosphereSize.y);
  //draw earth
  
  fill(color(0, 0, 255));
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids){
    //spaceship-2-asteroid collisions
    for(var i=0; i< asteroids.locations.length;i++){
        if(isInside(spaceship.location,spaceship.size,asteroids.locations[i],asteroids.diams[i])){
            gameOver();
        }      
    }

    //asteroid-2-earth collisions
    for(var i=0; i< asteroids.locations.length;i++){         
        if(isInside(earthLoc,earthSize.x,asteroids.locations[i],asteroids.diams[i])){
            gameOver();           
        }      
    }
        
    //spaceship-2-earth
    if(isInside(spaceship.location,spaceship.size,earthLoc,earthSize.x)==true) gameOver();

    //spaceship-2-atmosphere
    if(isInside(spaceship.location,spaceship.size,atmosphereLoc,atmosphereSize.x)==true) spaceship.setNearEarth();

    //bullet collisions
    for(var i=0; i<spaceship.bulletSys.bullets.length;i++){     
        for(var h=0; h<asteroids.locations.length;h++){    
            if(isInside(spaceship.bulletSys.bullets[i],spaceship.bulletSys.diam,asteroids.locations[h],asteroids.diams[h])) {         
                asteroids.destroy(h);
                spaceship.bulletSys.bullets.splice(i,1);
                i--;
                break;           
            } 
        }
    }       
}

//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB){
    if(dist(locA.x,locA.y,locB.x,locB.y)<(sizeA/2)+(sizeB/2)){        
        return true;
    }   
    return false;
}

//////////////////////////////////////////////////
function keyPressed(){
  if (keyIsPressed && keyCode === 32){ // if spacebar is pressed, fire!
    spaceship.fire();
  }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver(){
  fill(163,151,216);
  textFont("Georgia",80);
  textAlign(CENTER);
  text("GAME OVER", width/2, height/2);
  noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky(){
  push();
  while (starLocs.length<300){
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i=0; i<starLocs.length; i++){
    rect(starLocs[i].x, starLocs[i].y,2,2);
  }

  if (random(1)<0.3) starLocs.splice(int(random(starLocs.length)),1);
  pop();
}

//////////////////////////////////////////////////
//function that display the score
function score(){
  fill(64,20,150);
  textSize(30);
  textAlign(CENTER);
  text("SCORE: " + asteroids.score,70,30);
}


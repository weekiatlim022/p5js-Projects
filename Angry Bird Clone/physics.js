////////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround(){
  push();
  fill(128);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller(){
  propeller =Bodies.rectangle(150,480,200,15,{isStatic: true,angle:angle});
  World.add(engine.world,[propeller]);
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller(){
  push();
  fill('grey');
  drawVertices(propeller.vertices);
  Body.setAngle(propeller,angle);
  Body.setAngularVelocity(propeller,angleSpeed);
  angle+= angleSpeed;
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird(){
  var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
      restitution: 0.95 });
  Matter.Body.setMass(bird, bird.mass*10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds(){
  push();
  fill('red');
  for(var i=0;i< birds.length;i++){
      if(isOffScreen(birds[i])){
          removeFromWorld(birds[i]);
          birds.splice(i,1);
          i--;
      }
      else{
          drawVertices(birds[i].vertices);
      }
  }
  pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){
    boxes = Composites.stack(600,130,3,6,0,0,                          
                             function(x,y) {
                                return Bodies.rectangle(x,y,80,80,{                                
                                    render:{                                     
                                        fillStyle: "",
                                        strokeStyle: "black"
                                    }
                                });
                            });
    
    for(var i=0;i<boxes.bodies.length;i++){
        var g = random(100,255);
        boxes.bodies[i].render.fillStyle = color(0,g,0);
    }
    
    World.add(engine.world,[boxes]);
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
    push();
    for(var i=0;i<boxes.bodies.length;i++){       
      fill(boxes.bodies[i].render.fillStyle);
      stroke(boxes.bodies[i].render.strokeStyle);
      drawVertices(boxes.bodies[i].vertices);
    }
    
    for(var i=0;i<boxes.bodies.length;i++){
      if(isOffScreen(boxes.bodies[i])){
          removeFromWorld(boxes.bodies[i]);
          boxes.bodies.splice(i,1);
          i--;          
      } 
        
    }
    pop();    
}
////////////////////////////////////////////////////////////////
function setupSlingshot(){
    slingshotBird = Bodies.circle(180, 180, 20, {restitution:0.95, friction: 0});
    Matter.Body.setMass(slingshotBird, slingshotBird.mass*10);
    slingshotConstraint = Constraint.create({
    pointA: { x: 180, y: 150 },
    bodyB: slingshotBird,
    pointB: { x: 0, y: 0 },
    stiffness: 0.01,
    damping: 0.0001
  });
  World.add(engine.world, [slingshotBird, slingshotConstraint]);
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
    push();
    fill('blue');
    drawVertices(slingshotBird.vertices);
    drawConstraint(slingshotConstraint);  
    pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, [mouseConstraint]);
}


function drawCountdown(){ 
    if (frameCount % 60 == 0 && timer > 0) {
        timer--;
    }
    push();   
    fill(64,20,150);     
    textSize(30);      
    textAlign(CENTER);     
    text("TIME LEFT:" + timer,120,30);    
    pop();
}

function gameLose(){
    fill(255);
    textFont("Georgia",80);       
    textAlign(CENTER);    
    text("GAME OVER", width/2, height/2); 
    noLoop();
}

function gameWon(){
    fill(255);
    textFont("Georgia",80);       
    textAlign(CENTER);    
    text("YOU WIN", width/2, height/2); 
    noLoop();
}


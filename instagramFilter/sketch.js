// Image of Husky Creative commons from Wikipedia:
// https://en.wikipedia.org/wiki/Dog#/media/File:Siberian_Husky_pho.jpg
var imgIn;
var matrix = [
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64]
];
/////////////////////////////////////////////////////////////////
function preload() {
    imgIn = loadImage("assets/husky.jpg");
}
/////////////////////////////////////////////////////////////////
function setup() {
    createCanvas((imgIn.width * 2), imgIn.height);
}
/////////////////////////////////////////////////////////////////
function draw() {
    background(125);
    image(imgIn, 0, 0);
    image(earlyBirdFilter(imgIn), imgIn.width, 0);
    noLoop();
}
/////////////////////////////////////////////////////////////////
function mousePressed(){
  loop();
}
/////////////////////////////////////////////////////////////////
function earlyBirdFilter(img){
  var resultImg = createImage(imgIn.width, imgIn.height);
  resultImg = sepiaFilter(imgIn);
  resultImg = darkCorners(resultImg);
  resultImg = radialBlurFilter(resultImg);
  resultImg = borderFilter(resultImg)
  return resultImg;
}

function borderFilter(imgIn){
    var resultImg = createGraphics(imgIn.width,imgIn.height);
    resultImg.image(imgIn,0,0);
    resultImg.noFill();
    resultImg.stroke(255);
    resultImg.strokeWeight(50);
    
    resultImg.rect(0,0,imgIn.width,imgIn.height,60);
    resultImg.rect(0,0,imgIn.width,imgIn.height,40);
    return resultImg;
    
}

function radialBlurFilter(imgIn){
    imgIn.loadPixels();
    var matrixSize = matrix.length;
    for(var x=0; x<imgIn.width; x++){
        for(var y=0; y<imgIn.height; y++){
            var pixelIndex = ((imgIn.width * y) +x)*4;
            var oldRed = imgIn.pixels[pixelIndex+0];
            var oldGreen = imgIn.pixels[pixelIndex+1];
            var oldBlue = imgIn.pixels[pixelIndex+2];
            
            //[totalRed, totalGreen, totalBlue]
            var c = convolution(x,y,matrix,matrixSize,imgIn);
            
            //where c[0] is the red channel returned from the convolution,
            //r is the red channel in the original image and 
            //dynBlur is a value we generated using the distance from the mouse. 
             
            //hardcore mouse x and y here
            //For each pixel we need to calculate the distance between it and the mouse on the colour image.
            var mouse_x = 250;
            var mouse_y = 250;
            var mouseDist = dist(x,y,mouse_x,mouse_y);
            
            //We need to remap the distance from a range 100 to 300 to a new range from 0 to 1.
            var dynBlur = map(mouseDist,100,300,0,1);
            
            //We then need to constrain the returned value from 0 to 1 and save it in the dynBlur variable.
            dynBlur = constrain (dynBlur,0,1);
            
            //red
            var newRed = c[0]*dynBlur + oldRed*(1-dynBlur);
            var newGreen = c[1]*dynBlur + oldGreen*(1-dynBlur);
            var newBlue = c[2]*dynBlur + oldBlue*(1-dynBlur);
            
            imgIn.pixels[pixelIndex + 0] = newRed;
            imgIn.pixels[pixelIndex + 1] = newGreen;
            imgIn.pixels[pixelIndex + 2] = newBlue;
            imgIn.pixels[pixelIndex + 3] = 255;
        }
    }
    imgIn.updatePixels();
    return imgIn;
}

function convolution(x,y,matrix,matrixSize,imgIn){
    var totalRed = 0.0;
    var totalGreen = 0.0;
    var totalBlue = 0.0;
    var offset = floor(matrixSize / 2);
    
    //convolution matrix loop
    for(var i=0; i < matrixSize; i++){
        for(var j=0; j < matrixSize; j++){
            //Get pixel loc within convolution matrix
            var xloc= x + i -offset;
            var yloc= y + j -offset;
            var index= (xloc + imgIn.width * yloc) * 4;
            //ensure we don't address a pixel that doesn't exist
            index = constrain(index,0,imgIn.pixels.length - 1);
            
            //multiply all values with the mask and sum up
            totalRed += imgIn.pixels[index +0] * matrix[i][j];
            totalGreen += imgIn.pixels[index +1] * matrix[i][j];
            totalBlue += imgIn.pixels[index +2] * matrix[i][j];
        }
    }
    //return the new color as an array
    return [totalRed, totalGreen, totalBlue];
}

function darkCorners(resultImg){
    imgIn.loadPixels();
    var midX = imgIn.width/2;
    var midY = imgIn.height/2;
    var maxDist = dist(midX,midY,0,0);
    
    for(var x=0; x<imgIn.width; x++){
        for(var y=0; y<imgIn.height; y++){
            
            var d = dist(midX,midY,x,y);
            
            if(d>300){
                var pixelIndex = ((imgIn.width * y) +x)*4;  
                var oldRed = imgIn.pixels[pixelIndex+0];
                var oldGreen = imgIn.pixels[pixelIndex+1];
                var oldBlue = imgIn.pixels[pixelIndex+2];
                
                if(d<450){ //300 to 450
                    //from 300 to 450 scale by 1 to 0.4 depending on distance
                    var dynLum = map(d,300,450,1,0.4);
                }else{ //40 or more
                    var dynLum = map(d,450,maxDist,0.4,0);
                }
                dynLum = constrain(dynLum,0,1);
                imgIn.pixels[pixelIndex+0] = oldRed * dynLum;
                imgIn.pixels[pixelIndex+1] = oldGreen * dynLum;
                imgIn.pixels[pixelIndex+2] = oldBlue * dynLum;
                imgIn.pixels[pixelIndex+3] = 255;
            }           
        }
    }
    imgIn.updatePixels();
    return imgIn;
}

function sepiaFilter(imgIn){
    imgIn.loadPixels();
    for(var x=0; x<imgIn.width; x++){
        for(var y=0; y<imgIn.height; y++){
            var pixelIndex = ((imgIn.width * y) +x)*4;
            var oldRed = imgIn.pixels[pixelIndex+0];
            var oldGreen = imgIn.pixels[pixelIndex+1];
            var oldBlue = imgIn.pixels[pixelIndex+2];
            
            var newRed = (oldRed * .393) + (oldGreen *.769) + (oldBlue * .189);
            var newGreen = (oldRed * .349) + (oldGreen *.686) + (oldBlue * .168);
            var newBlue = (oldRed * .272) + (oldGreen *.534) + (oldBlue * .131);
            
            newRed= constrain(newRed,0,255);
            newGreen= constrain(newGreen,0,255);
            newBlue= constrain(newBlue,0,255);
            
            imgIn.pixels[pixelIndex+0] = newRed;
            imgIn.pixels[pixelIndex+1] = newGreen;
            imgIn.pixels[pixelIndex+2] = newBlue;
            imgIn.pixels[pixelIndex+3] = 255;
        }
    }
    imgIn.updatePixels();
    return imgIn;
}

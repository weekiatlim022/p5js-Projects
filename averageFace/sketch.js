var imgs;
var avgImg;
var numOfImages = 30;

//////////////////////////////////////////////////////////
function preload() { // preload() runs once
    imgs = []; 
    avgImg = 0;
    for (var i=0; i < numOfImages; i++){
        var images = loadImage("assets/"+i+".jpg",imageloadSuccess);
        imgs.push(images);
    }   
}
//////////////////////////////////////////////////////////
function imageloadSuccess(){
    avgImg++;
}
//////////////////////////////////////////////////////////
function setup() {
    createCanvas((imgs[0].width * 2), imgs[0].height);
    avgImg = createGraphics(imgs[0].width, imgs[0].height);
    pixelDensity(1);
    
}
//////////////////////////////////////////////////////////
function draw() {
    background(125);
    
    //display the first image
    image(imgs[0],0,0);
    
    //load all the images pixels for processing
    for(var i=0; i < imgs.length; i++){
        imgs[i].loadPixels();
    }
    
    avgImg = createImage(imgs[0].width,imgs[0].height);
    avgImg.loadPixels();
    
    //display the average face image
    avgImg= averageFace(imgs);
    image(avgImg,imgs[0].width,0);
    noLoop();   
}
/////////////////////////////////////////////////////////
function averageFace(imgs){ 
    for(var y=0; y < avgImg.height; y++){
        for(var x =0; x < avgImg.width; x++){
            var pixelIndex=((avgImg.width * y ) + x) * 4;
            var sumR = 0;
            var sumG = 0;
            var sumB = 0;
            
            //get each pixel values for each images
            for( i=0; i < imgs.length; i++){
                var img = imgs[i];
                sumR +=img.pixels[pixelIndex+0];
                sumG +=img.pixels[pixelIndex+1];
                sumB +=img.pixels[pixelIndex+2];
            }
            //Update the new image with each pixel average RGB value
            avgImg.pixels[pixelIndex+0]=sumR/imgs.length;
            avgImg.pixels[pixelIndex+1]=sumG/imgs.length;
            avgImg.pixels[pixelIndex+2]=sumB/imgs.length;
            avgImg.pixels[pixelIndex+3]=255;
        }
    }
    avgImg.updatePixels();
    return avgImg;
}

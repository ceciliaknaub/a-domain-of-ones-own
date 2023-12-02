let canvas;
let w = window.innerWidth;
let h = window.innerHeight; 

let roomBackgroundColors = { 
  morning: '#E5E7E9', 
  afternoon: '#E5E7E9', 
  evening: '#E5E7E9',
  night: '#191970'}

let roomColor;

document.addEventListener('DOMContentLoaded', function () {


    const date = new Date();
    let hour = date.getHours();
       if (hour >= 20) {
            roomColor = roomBackgroundColors.night;
          } else if (hour >=17) {
            roomColor = roomBackgroundColors.evening;
          } else if (hour >=14){
            roomColor = roomBackgroundColors.afternoon;
          }
          else {
            roomColor = roomBackgroundColors.morning;
          }


    document.querySelector('.bookshelf-container').style.background = roomColor;

});

function setup() {
  canvas = createCanvas(w/2,h,WEBGL);
  background(roomColor);
  //background('white');
  canvas.position(w/4,0);
}

function draw(){
  drawBook(0,0,0,500,0,'red');
  drawBook(50,50,0,400,0,'blue');
  drawBook(100,12.5,0,475,0,'green');
  drawBook(200,45,0,475,1,'yellow');
}

function drawBook(x,y,z,h,r,color) {
  fill(color);
  noStroke();
  push();
  //texture(img);
  rotateZ(-PI*r/24);
  translate(x, y, z);
  box(50, h, 70);
  pop();
  push();
}



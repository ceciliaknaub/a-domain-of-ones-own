let canvas;
let w = window.innerWidth;
let h = window.innerHeight; 

let roomBackgroundColors = { 
  morning: '#E5E7E9', 
  afternoon: '#E5E7E9', 
  evening: '#E5E7E9',
  night: '#191970'}

let roomColor;
let book1;
let font1;

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

function preload(){
  book1 = loadImage('./assets/to_the_lighthouse_cover.png');
  font1 = loadFont('./assets/Junge/Junge-Regular.ttf');
}

function setup() {
  canvas = createCanvas(w/2,h,WEBGL);
  background(roomColor);
  //background('white');
  canvas.position(w/4,0);
}

function draw(){
  drawBook(0,0,0,500,0,book1);
  push();
  fill(255);
  textFont(font1);
  rotate(PI/2);
  translate(-150,-45,35);
  text('To The Lighthouse',100,50);
  pop();
  //drawBook(50,50,0,400,0,'blue');
 //drawBook(100,12.5,0,475,0,'green');
  //drawBook(200,45,0,475,1,'yellow');
}

function drawBook(x,y,z,h,r,image) {
  texture(image);
  noStroke();
  push();
  //texture(img);
  rotateZ(-PI*r/24);
  translate(x, y, z);
  box(50, h, 70);
  pop();
  push();
}



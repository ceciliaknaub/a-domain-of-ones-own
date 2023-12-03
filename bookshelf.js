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
let book2;
let font1;
let font2;

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
  book2 =  loadImage('./assets/shoe_dog_cover.jpg');
  book3 = loadImage('./assets/didion_cover.png');
  font1 = loadFont('./assets/Junge/Junge-Regular.ttf');
  font2 = loadFont('./assets/Hind/Hind-Bold.ttf');
}

function setup() {
  canvas = createCanvas(w/2,h,WEBGL);
  background(roomColor);
  //background('white');
  canvas.position(w/4,0);
}

function draw(){
  drawBook(500,50,0,book1,'To The Lighthouse',font1,255);
  push();
  rotate(PI/2);
  translate(0,0,40);
  textAlign(CENTER);
  text("To The Lighthouse",0,10);
  pop();
  
  translate(57,12,0);
  drawBook(475,65,0,book2,'SHOE DOG',font2,'#A9672A');
  push();
  rotate(PI/2);
  translate(0,0,40);
  textAlign(CENTER);
  text("SHOE DOG",0,10);
  pop();

  translate(50,0,0);
  drawBook(475,45,0,book3,'The Year of Magical Thinking',font1,'black');
  push();
  rotate(PI/2);
  translate(0,0,40);
  textAlign(CENTER);
  push();
  textSize(18);
  textAlign(CENTER);
  translate(-150,0,40);
  text("Joan Didion",0,10);
  pop();
  textSize(14);
  text("The Year of Magical Thinking",0,10);
  pop();

  //drawBook(0,50,0,400,0,'blue');
 //drawBook(100,12.5,0,475,0,'green');
  //drawBook(200,45,0,475,1,'yellow');
}

function drawBook(h,w,r,image,title,font,textColor) {
  bookStyle(image,title,font,textColor);
  noStroke();
  rotateZ(-PI*r/24);
  box(w, h, 70);
}

function bookStyle(image,title,font,textColor) {
  fill(textColor);
  textFont(font);
  texture(image);
  textSize(24);
  /*push();
  translate(0,0,38);
  rotate(PI/2);
  textAlign(CENTER);
  text(title,0, 10);
  pop();*/
}



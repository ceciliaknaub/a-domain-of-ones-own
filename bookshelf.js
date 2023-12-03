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
  drawBook(500,50,0,book1,'Virginia Wolf','To The Lighthouse',font1,255);
  //bookText('Virginia Wolf','To The Lighthouse',font1,255);
  
  translate(57,12,0);
  drawBook(475,65,0,book2,'Phil Knight','SHOE DOG',font2,'#A9672A');
  //bookText('Phil Knight','SHOE DOG',font2,'#A9672A');

  translate(50,0,0);
  drawBook(475,45,0,book3,'Joan Didion','The Year of Magical Thinking',font1,'black');
}

function drawBook(h,w,r,image, author, title,font,textColor) {
  //bookStyle(image,title,font,textColor);
  noStroke();
  rotateZ(-PI*r/24);
  texture(image);
  box(w, h, 70);
  bookText(author,title,font,textColor);
}

function bookText(author,title,font,textColor) {
  push();
  textFont(font);
  fill(textColor);
  translate(0,0,40);
  rotate(PI/2);
  textAlign(CENTER);
  textSize(14);
  text(title,0, 5);
  textSize(18);
  text(author,-150, 5);
  pop();
}
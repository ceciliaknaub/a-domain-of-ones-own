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

function preload(){
  book1 = loadImage('./assets/to_the_lighthouse_cover.png');
  book2 =  loadImage('./assets/shoe_dog_cover.jpg');
  book3 = loadImage('./assets/didion_cover.png');
  book4 = loadImage('./assets/bell_hooks_cover.png');
  font1 = loadFont('./assets/Junge/Junge-Regular.ttf');
  font2 = loadFont('./assets/Hind/Hind-Bold.ttf');
}

let objects = []
let dRay;
let ray;


function slct(h,w,d,x, y, z, img,author,title,font,fontColor)  {
  return(
    {
      h: h,
      w: w,
      d: d,
      x: x,
      y: y,
      z: z,
      image: img,
      author: author,
      title: title,
      font: font,
      fontColor: fontColor
    }
  )
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  
  // Add shapes to objects array
  objects.push(slct(500, 50, 0, 0, 0, 0, book1,'Virginia Woolf','To The Lighthouse',font1,'white'))
  objects.push(slct(475, 65, 0, 58, 12.50, 0, book2,'Phil Knight','Shoe Dog',font2,'#A9672A'))
  objects.push(slct(480, 45, 0, 114, 10, 0,book3,'Joan Didion','Title',font1,'black'))
  objects.push(slct(500, 50, 0, 161, 0 , 0,book4,'bell hooks','all about love',font1,'black'))

  background(roomColor);
  //background('white');
  canvas.position(w/12,0);
}

function draw() {   
  noStroke();

  for(let i = 0; i < objects.length; i++){
 drawBook(objects[i].w,objects[i].h,objects[i].d,objects[i].x,objects[i].y,objects[i].z,objects[i].author,objects[i].title,objects[i].font,objects[i].fontColor,objects[i].image);
  }
}

function drawBook(x,y,z,objX,objY,objZ,author,title,font,fontColor,img) {
    push()
      translate(objX,objY,objZ)
      texture(img);
      box(x,y,z)
    pop();

    push()
    translate(objX,objY,5)
    bookText(author,title,font,fontColor);
    pop();
}

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

function bookText(author,title,font,fontColor) {
  textFont(font);
  //translate(0,0,5);
  rotate(PI/2);
  textAlign(CENTER);
  textSize(14);
  fill(fontColor);
  text(title,0, 5);
  textSize(18);
  text(author,-150, 5);
}
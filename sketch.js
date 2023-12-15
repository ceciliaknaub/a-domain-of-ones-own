let angleX = 0;
let angleY = 0;
let cubeSize = window.innerHeight;

let w = window.innerWidth;
let h = window.innerHeight; 

let x;
let y;

let ceilingColor;
let floorColor;
let gradientColor1;
let gradientColor2;
let img;
let book1;
let font1;
let wallColors = ['red','magenta','blue'];
let ceilingFlooorColors = [' #CC0000','#cc00cc',' #0000CC'];
let index = 0;

const morning = {
  background: '#E5E7E9',
  ceiling: '#F2F3F4',
  floor: '#BCAAA4',
  gradientColor1: '#83BFF3',
  gradientColor2: '#E6F2FC'
}

const afternoon = {
  background: '#E5E7E9',
  ceiling: '#F2F3F4',
  floor: '#BCAAA4',
  gradientColor1: '#83BFF3',
  gradientColor2: '#CFE6F9',
}

const evening = {
  background: '#E5E7E9',
  ceiling: '#F2F3F4',
  floor: '#BCAAA4',
  gradientColor2: '#E5A166',
  gradientColor1: '#83BFF3'
}

const night = {
  background: '#191970',
  ceiling: '#141458',
  floor: '#141458',
  gradientColor1: '#160C35',
  gradientColor2: '#2D2449'
}

function preload(){
  img = loadImage('./assets/calendar.jpg');
  book1 = loadImage('./assets/to_the_lighthouse_cover.png');
  book2 =  loadImage('./assets/shoe_dog_cover.png');
  book3 = loadImage('./assets/didion_cover.png');
  book4 = loadImage('./assets/bell_hooks_cover.png');
  font1 = loadFont('./assets/Junge/Junge-Regular.ttf');

  //song = loadSound('./assets/party_song.mp3');
}

function setup() {
  createCanvas(w, h, WEBGL);
  setInterval(changeColor, 750);

  runOncePerDay(); // run the code
  //splash();
}

function draw() {
  const date = new Date();
  let hour =  date.getHours();
  angleY = map(mouseX, 0, width, -PI, PI);
  rotateY(constrain(angleY,PI/4,3*(PI/4)));
  noStroke();

  if (hour >= 20 || hour <= 5) {
    if(localStorage.getItem('partyCount') == 9) {
      background(wallColors[index])
      ceilingColor = ceilingFlooorColors[index]
      floorColor = ceilingFlooorColors[index]
      //song.play();
    } else {
      background(night.background);
      ceilingColor = night.ceiling;
      floorColor = night.floor;  
    }
    gradientColor1 = night.gradientColor1
    gradientColor2 = night.gradientColor2;
  } else if (hour >=17) {
    background(evening.background);
    ceilingColor = evening.ceiling;
    floorColor = evening.floor;
    gradientColor1 = evening.gradientColor1
    gradientColor2 = evening.gradientColor2;

    //Draw Wine Bottle and Glasses
    //Wine Bottle
    push();
    translate(200,250,200);
    drawWineBottle();
    pop();
    
    //glass
    push();
    translate(200,260,225);
    drawGlass();
    pop();

  } else if (hour >=14){
    background(afternoon.background);
    ceilingColor = afternoon.ceiling;
    floorColor = afternoon.floor;
    gradientColor1 = afternoon.gradientColor1
    gradientColor2 = afternoon.gradientColor2;
  }
  else {
    background(morning.background);
    ceilingColor = morning.ceiling;
    floorColor = morning.floor;
    gradientColor1 = morning.gradientColor1
    gradientColor2 = morning.gradientColor2;

    //Draw Mugs
    push();
    translate(200,325,100);
    drawMug(255,0,0);
    pop();
  
    push();
    translate(200,325,150);
    drawMug(255,225,0);
    pop();  

  }

  // Top face
  drawTopFace(ceilingColor);

  // Bottom face
  drawBottomFace(floorColor);

  //Window
  drawWindow();

  //Books on bookshelf
  push();
  //Add directional light for night setting
  if (hour >= 20 || hour <= 5) {
    directionalLight(25, 0, 100, 1, 0, -1);
  }
  push();
  translate(0, 0, -350);
  drawBook(10, 100, 70,book1);
  pop();
  
  push();
  translate(10, 10, -350);
  drawBook(15, 80, 70,book2);
  pop();

  push();
  translate(20, 10, -350);
  drawBook(8, 80, 70,book3);
  pop();

  push();
  translate(30, 10, -350);
  drawBook(10, 80, 70,book4);
  pop();

  push();
  translate(-10, 55,  -350);
  fill('#7C3636');
  box(150, 10, 70);
  pop();
  pop();

  //plant
  push()
  translate(260,300,-250);
  drawPlant();
  pop()

  //Mugs
  //alarm clock
  push();
  translate(-50, 38, -350);
  drawClock();
  pop();

  push();
  translate(-35,-285,-350);
  drawLight();
  pop();

if (angleY > 1.2) {
  if (hour >= 20 || hour <= 5) {
    directionalLight(25, 0, 100, 1, 0, -1);
  }
  drawCalendar();
}

push();
fill('black')
textFont(font1);
pop();
}

function drawBottomFace(color) {
  fill(color);
  beginShape();
  vertex(-cubeSize / 2, cubeSize / 2, -cubeSize / 2); 
  vertex(-cubeSize / 2, cubeSize / 2, cubeSize / 2);
  vertex(cubeSize / 2, cubeSize / 2, cubeSize / 2);
  vertex(cubeSize / 2, cubeSize / 2, -cubeSize / 2);
  endShape(CLOSE);
}

function drawTopFace(color) {
  fill(color);
  beginShape();
  vertex(-cubeSize / 2, -cubeSize / 2, -cubeSize / 2); 
  vertex(-cubeSize / 2, -cubeSize / 2, cubeSize / 2);
  vertex(cubeSize / 2, -cubeSize / 2, cubeSize / 2);
  vertex(cubeSize / 2, -cubeSize / 2, -cubeSize / 2);
  endShape(CLOSE);
}

function drawWindow() {
  //pane
  push();
  beginShape();
  noStroke();
 //strokeWeight(2);
  //stroke('black');
  fill(gradientColor1);
  vertex(cubeSize / 2.05, -cubeSize / 6, -cubeSize / 10); 
  vertex(cubeSize / 2.05, -cubeSize / 6, cubeSize / 10);
  fill(gradientColor2);
  vertex(cubeSize / 2.05, cubeSize / 6, cubeSize / 10);
  vertex(cubeSize / 2.05, cubeSize / 6, -cubeSize / 10);
  endShape(CLOSE);
  pop();
}

function changeColor(){  
  index++; 
   
   if(index >= wallColors.length){
    index = 0; 
     
   }
 }


//Draw items added to the room

function drawBook(x,y,z,image){
  texture(image);
  box(x,y,z)
}

function drawCalendar() {
  texture(img);
  beginShape();
  noStroke();
  rotate(PI/2);
  translate(0,0,cubeSize/2);
  box(100,150,1);
  endShape(CLOSE);
}

function drawMug(r,g,b) {
  rotateY(-PI/3);
  push();
  directionalLight(r,g,b, 0, 0, -1);
  noStroke();
  //cylinder(20, 100);
  
  //coffee
  push();
  translate(0,-30,0)
  fill('brown');
  cylinder(15,1);
  pop();
  //base
  //sphere(15);
  translate(0,-15);
  cylinder(15,30);
  
  
  //handle
  translate(10,0);
  torus(12,3);
  pop();
  }

function drawWineBottle() {

  //bottle base
  directionalLight(53, 125, 0, 1, 0, -1);
  noStroke();
  cylinder(10, 60);
  
  //bottle neck
  translate(0,-50);
  noStroke();
  cylinder(4,20);
  
  //spehere
  translate(0,20);
  sphere(10);
  }

function drawGlass() {
    directionalLight(242, 247, 249 , 0, -1, -1);
    noStroke();
    
    sphere(10);
    translate(0,-10);
    cylinder(10,20);
    translate(0,25);
    cylinder(2,25);
    
    translate(0,12);
    cylinder(10,1);
}

function drawClock() {
  push();
  fill('black');
  box(75,25,25);
  translate(0,0,13);
  fill("#72A400");
  textFont(font1);
  textAlign(CENTER, CENTER);
  textSize(12);

  //calculate time
  let Hour = hour();
  let min = minute();
  let noon = Hour >= 12? " PM" : " AM"

  //style minute
  if(min < 10) {
    min = "0"+min
  }
  //convert
  if (Hour % 12 == 0){
    Hour = 12
  } else {
    Hour%=12
  }
  text(Hour+":"+min+noon,0,0); 
  pop();
}

function drawPlant() {

  //plant
  push()
  translate(0,-60,0);
  drawLeaf(15,80,10)
  pop()
  
  push()
  translate(-25,-60,0);
  drawLeaf(12,35,10)
  pop()
  
  push()
  translate(25,-40,0);
  drawLeaf(10,20,10)
  pop()

  //pot
  push();
  directionalLight(203,75,67, -0.25, 0, -1);
  cylinder(40,50)
  
  push();
  translate(0,-30,0);
  cylinder(45,10)

  pop();
  pop();
}

function drawLeaf(x,y,z) {
  directionalLight(0,255,0, -0.25, 0, -1);
  ellipsoid(x,y,z);
}

function drawLight() {
  rotate(PI);
  push()
  directionalLight(255,0,0, -0.25, 0, -1);
  noStroke();
  cone(20,30);
  
  translate(0,10)
  cylinder(5,10);
  pop();

  push();
  fill('black');
  translate(0,25)
  cylinder(2,80);
  pop();
  
  push()
  fill('yellow');
  translate(0,-15)
  sphere(5)
  pop()  
}

function splash() {
  let splashscreen = document.querySelector('.splash');
  splashscreen.addEventListener('click',() => {
    splashscreen.style.opacity=0;
    setTimeout(()=>{
      splashScreen.classList.add('hide')
    },610)
  })
}

// checks if one day has passed. 
function hasOneDayPassed() {
  // get today's date. eg: "7/37/2007"
  var date = new Date().toLocaleDateString();

  // if there's a date in localstorage and it's equal to the above: 
  // inferring a day has yet to pass since both dates are equal.
  if( localStorage.yourapp_date == date ) 
      return false;

  // this portion of logic occurs when a day has passed
  localStorage.yourapp_date = date;
  return true;
}
// some function which should run once a day
function runOncePerDay(){
  if( !hasOneDayPassed() ) return false;

  // your code below
  localStorage.partyCount = int(random(1,10));
  splash();
}

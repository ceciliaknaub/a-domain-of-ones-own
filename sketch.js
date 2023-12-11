let angleX = 0;
let angleY = 0;
let cubeSize = window.innerHeight;

let w = window.innerWidth;
let h = window.innerHeight; 

let ceilingColor;
let floorColor;
let gradientColor1;
let gradientColor2;
let img;
let book1;
let pts;
let pts2;
let font1;
let wallColors = ['red','magenta','blue'];
let ceilingFlooorColors = [' #CC0000','#cc00cc',' #0000CC'];
let index = 0;
let partyCount;

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
}

function setup() {
  createCanvas(w, h, WEBGL);
  setInterval(changeColor, 750);
  //rectMode(CENTER);
  pts = font1.textToPoints('A Domain', 0, 0, 50,{
    sampleFactor: 0.15,
    simplifyThreshold: 0
      
  });
  
  pts2 = font1.textToPoints("Of One's Own", 0, 0, 50,{
    sampleFactor: 0.15,
    simplifyThreshold: 0
      
  });
  }

function draw() {
  const date = new Date();
  let hour =  date.getHours();
  angleY = map(mouseX, 0, width, -PI, PI);
  rotateY(constrain(angleY,PI/4,3*(PI/4)));
  
  noStroke();

  if (hour >= 20 || hour <= 5) {
    if(partyCount == 9) {
      background(wallColors[index])
      ceilingColor = ceilingFlooorColors[index]
      floorColor = ceilingFlooorColors[index]
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
  }

  // Top face
  drawTopFace(ceilingColor);

  // Bottom face
  drawBottomFace(floorColor);

  //Window
  drawWindow();

  //Books on bookshelf
  push();
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


  //Wine bottle
  //push();
 //translate(200,250,200);
  //drawWineBottle();
  //pop();

  //FrenchPress
  //push();
  //translate(200,250,200);
  //drawFrenchPress();
  //pop();

  //Mugs
  push();
  translate(200,325,100);
  drawMug(255,0,0);
  pop();

  push();
  translate(200,325,150);
  drawMug(255,225,0);
  pop();

  //alarm clock
  push();
  translate(-50, 38, -350);
  clock();
  pop();

  //drawHeader();

  //glass
  //push();
  //translate(200,260,225);
  //drawGlass();
  //pop();

  //Rug
  //drawRug();
  
if (angleY > 1.2) {
  if (hour >= 20 || hour <= 5) {
    directionalLight(25, 0, 100, 1, 0, -1);
  }
  drawCalendar();
}


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

/*function drawWindowTrim() {
  push();
  beginShape();
  strokeWeight(2);
  stroke('black');
  fill('white');
  vertex(cubeSize / 2, -cubeSize / 5, -cubeSize / 8); 
  vertex(cubeSize / 2, -cubeSize / 5, cubeSize / 8);
  vertex(cubeSize / 2, cubeSize / 5, cubeSize / 8);
  vertex(cubeSize / 2, cubeSize / 5, -cubeSize / 8);
  endShape(CLOSE);
  pop();
}*/

function drawRug() {
  push();
  beginShape();  
  texture(rug);
  //rotateZ(-PI/12);
  rotateX(PI/2);
  translate(0,0,-cubeSize/2);
  box(200,300,1);
  endShape();
  pop();
}

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

  function drawFrenchPress() {
    noStroke();
    push();
    //directionalLight(255, 255, 255 , 0, -0.5, -1);
    //cylinder(20, 100);
    
    //directionalLight(250, 250, 250, -.845, -.425, -1);
    cylinder(20,80);
    pop();
    
    //base
    push();
    fill('black');
    translate(0,40);
    cylinder(20,10);
    pop();
    
    //lid
    push();
    fill('black');
    translate(0,-40);
    sphere(20);
    pop();
    
    //handle
    push();
    fill('black');
    translate(20,0);
    torus(15, 5);
    pop();
  
    //plunger
    push();
    fill('black');
    translate(0,-60);
    sphere(5);
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

  function changeColor(){  
    index++; 
     
     if(index >= wallColors.length){
      index = 0; 
       
     }
   }

function clock() {
  push();
  fill('black');
  box(75,25,25);
  translate(0,0,13);
  fill("#72A400");
  textFont(font1);
  textAlign(CENTER, CENTER);
  textSize(12);
  let Hour = hour();
  let min = minute();
  let noon = Hour >= 12? " PM" : " AM"
  if(min < 10) {
    min = "0"+min
  }     
  Hour%=12
  text(Hour+":"+min+noon,0,0); 
  pop();
}
document.addEventListener('DOMContentLoaded', function () {

//Drag and Drop tutorial from https://www.javascripttutorial.net/web-apis/javascript-drag-and-drop/

//select item element
const item = document.querySelector('.item');

/*make draggable*/
item.draggable = "true";

/*add event listener*/
item.addEventListener('dragstart', dragStart);

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
}

/* drop targets */
const boxes = document.querySelectorAll('.box');

boxes.forEach(box => {
    box.addEventListener('dragenter', dragEnter)
    box.addEventListener('dragover', dragOver);
    box.addEventListener('dragleave', dragLeave);
    box.addEventListener('drop', drop);

/*Daily party indicator*/
runAtSpecificTimeOfDay(6, 0, getPartyCount());
});

//splash();

function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragLeave(e) {
    e.target.classList.remove('drag-over');
}

function drop(e) {
    e.target.classList.remove('drag-over');

    // get the draggable element
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);

    // add it to the drop target
    e.target.appendChild(draggable);

    // display the draggable element
    draggable.classList.remove('hide');
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

/*https://gist.github.com/farhad-taran/f487a07c16fd53ee08a12a90cdaea082*/

function runAtSpecificTimeOfDay(hour, minutes, func)
{
  const twentyFourHours = 86400000;
  const now = new Date();
  let eta_ms = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minutes, 0, 0).getTime() - now;
  if (eta_ms < 0)
  {
    eta_ms += twentyFourHours;
  }
  setTimeout(function() {
    //run once
    func();
    // run every 24 hours from now on
    setInterval(func, twentyFourHours);
  }, eta_ms);
}

function getPartyCount() {
  let min = Math.ceil(1);
  let max = Math.floor(25);
  partyCount = Math.floor(Math.random() * (max - min) + min);
  console.log(partyCount);
}

})
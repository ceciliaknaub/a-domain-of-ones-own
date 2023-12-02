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
let rug;
let book1;

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
  rug = loadImage('./assets/red-rug.jpeg');
  book1 = loadImage('./assets/to_the_lighthouse_cover.png');
}

function setup() {
  createCanvas(w, h, WEBGL);
  //rectMode(CENTER);
  }

function draw() {
  const date = new Date();
  let hour = date.getHours();
  

  angleY = map(mouseX, 0, width, -PI, PI);
  rotateY(constrain(angleY,PI/4,3*(PI/4)));
  
  noStroke();
  
  if (hour >= 20) {
    background(night.background);
    ceilingColor = night.ceiling;
    floorColor = night.floor;
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

  //Book
  
  push();
  translate(0, 0, -350);
  drawBook(10, 100, 70,book1);
  pop();

  /*push();
  translate(20, 5, -350);
  drawBook(10, 90, 70,'blue');
  pop();

  push();
  translate(40, 0, -350);
  drawBook(10, 100, 70,'green');
  pop();
  
  push();
  translate(60, 12, -350);
  rotateZ(-PI/12);
  drawBook(10, 75, 70,'yellow');
  pop();*/

  //Wine bottle
  push();
  translate(200,250,200);
  drawWineBottle();
  pop();

  //glass
  push();
  translate(200,260,225);
  drawGlass();
  pop();
  //Rug
  //drawRug();

    // left wall art
    //fill('brown');
    //beginShape();
    //vertex(-cubeSize / 6, -cubeSize / 12, -cubeSize / 1.5); 
    //vertex(cubeSize / 6, -cubeSize / 12, -cubeSize / 1.5);
    //vertex(cubeSize / 6, cubeSize / 12, -cubeSize / 1.5);
    //vertex(-cubeSize / 6, cubeSize / 12, -cubeSize / 1.5);
    //endShape(CLOSE);

if (angleY > 1.2) {
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
  box(x,y,z,color)
}

function drawCalendar() {
  texture(img);
  beginShape();
  noStroke();
  rotate(PI/2);
  translate(0,0,cubeSize/2);
  box(200,250,1);
  endShape(CLOSE);
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
document.addEventListener('DOMContentLoaded', function () {
/* select item element */
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

/*Bookshelf Link
let bookLink = document.querySelector('.book-links') 

bookLink.addEventListener('mouseover', function(){
  bookLink.style.background = 'black';
  bookLink.style.opacity = '0.25';
})

bookLink.addEventListener('mouseout', function(){
  bookLink.style.background = 'none';
})

/*Calendar Link
let calLink = document.querySelector('.cal') 

calLink.addEventListener('mouseover', function(){
  calLink.style.background = 'black';
  calLink.style.opacity = '0.25';
})

calLink.addEventListener('mouseout', function(){
  calLink.style.background = 'none';
})
*/

/* drop targets */
const boxes = document.querySelectorAll('.box');

boxes.forEach(box => {
    box.addEventListener('dragenter', dragEnter)
    box.addEventListener('dragover', dragOver);
    box.addEventListener('dragleave', dragLeave);
    box.addEventListener('drop', drop);
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

  /*Drag and Drop tutorial from https://www.javascripttutorial.net/web-apis/javascript-drag-and-drop/ */

function splash() {
  let splashscreen = document.querySelector('.splash');
  splashscreen.addEventListener('click',() => {
    splashscreen.style.opacity=0;
    setTimeout(()=>{
      splashScreen.classList.add('hide')
    },610)
  })
}
})
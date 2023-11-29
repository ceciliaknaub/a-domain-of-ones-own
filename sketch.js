let angleX = 0;
let angleY = 1.3;
let cubeSize = window.innerHeight;

let w = window.innerWidth;
let h = window.innerHeight; 

let ceilingColor;
let floorColor;
let gradientColor1;
let gradientColor2;
let img;
let rug;

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
}

function setup() {
  createCanvas(w, h, WEBGL);
  //rectMode(CENTER);

  //image(img,0,0,img.width / 2, img.height / 2);
  }

function draw() {
  const date = new Date();
  let hour = date.getHours();
  
 //stroke(132,191,243);
 // text("(" + mouseX + ", " + mouseY + ")", mouseX, mouseY);

  angleY = map(mouseX, 0, width, -PI, PI);
  //rotateY(angleY);
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
  //drawWindowTrim();

  //Book
  //drawBook();

  //Rug
  //drawRug();

if (angleY > 1.2) {
  drawCalendar();
}
  // left wall art
  //fill('brown');
  //beginShape();
  //vertex(-cubeSize / 6, -cubeSize / 12, -cubeSize / 2); 
  //vertex(cubeSize / 6, -cubeSize / 12, -cubeSize / 2);
  //vertex(cubeSize / 6, cubeSize / 12, -cubeSize / 2);
  //vertex(-cubeSize / 6, cubeSize / 12, -cubeSize / 2);
  //box()
  //endShape(CLOSE);
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

function drawWindowTrim() {
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
}

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

function drawBook(){
  push();
  texture(img);
  stroke('black');
  frameRate(60);
  //translate(0, -100, 0);
  //rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  //rotateY(frameCount * 0.01);
  box(70, 100, 10);
  pop();
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

/* drop targets */
const boxes = document.querySelectorAll('.box');

boxes.forEach(box => {
    box.addEventListener('dragenter', dragEnter)
    box.addEventListener('dragover', dragOver);
    box.addEventListener('dragleave', dragLeave);
    box.addEventListener('drop', drop);
});

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
})
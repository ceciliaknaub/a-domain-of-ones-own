let w = window.innerWidth;
let h = window.innerHeight; 

let roomBackgroundColors = { 
  morning: '#E5E7E9', 
  afternoon: '#E5E7E9', 
  evening: '#E5E7E9',
  night: '#191970'}

let roomColor;

let waterButton;
let feedButton;
let touchButton;

let wateringCan;
let platnFeed;
let no;

function setup(){
//get the date to know the time of day, in hours
const date = new Date();
let hour = date.getHours();

createCanvas(w,h,WEBGL);
//add sidebar text
let p = document.createElement('p');
p.innerHTML = "Welcome to the room. You could be sitting in one just like it. Time passes here. Look around. Engage with what you see. You might learn something, or get distracted; plan your next adventure, or just be.";
p.classList.add('index-bookmark');
document.querySelector('.text-container').appendChild(p);

//sets the background room color based on time of day
if (hour >= 20 || hour <= 5) {
  roomColor = roomBackgroundColors.night;
} else if (hour >=17) {
  roomColor = roomBackgroundColors.evening;
} else if (hour >=14){
  roomColor = roomBackgroundColors.afternoon;
}
else {
  roomColor = roomBackgroundColors.morning;
}
background(roomColor);

let btnCont = createElement('div');

waterButton = createButton('Water');
feedButton = createButton('Feed');
touchButton = createButton('Touch');
returnButton = createButton('Return');

waterButton.parent(btnCont);
feedButton.parent(btnCont);
touchButton.parent(btnCont);
returnButton.parent(btnCont);

waterButton.addClass('button-54');
feedButton.addClass('button-54');
touchButton.addClass('button-54');
returnButton.addClass('button-54');

waterButton.position(w/2.75,h/1.15);
feedButton.position(w/2.1,h/1.15);
touchButton.position(w/1.75,h/1.15);
returnButton.position(w/1.25,h/1.15);

waterButton.mousePressed(() => {
  translate(-300,-200);
    drawWateringCan();
});


feedButton.mousePressed(() => {
  translate(100,-300);
    drawPlantFeed();
});

touchButton.mousePressed(() => {
  translate(100,-300,-50);
    drawTouch();
});

returnButton.mousePressed(() => {
  background(roomColor);
});


}

function draw(){

//draw plant
noStroke();
translate(0,100,0);
drawPlant();

}

function drawPlant() {

    //plant
    push()
    translate(0,-100,0);
    drawLeaf(30,175,20)
    pop()
    
    push()
    translate(-45,-100,0);
    drawLeaf(20,100,10)
    pop()
    
    push()
    translate(45,-100,0);
    drawLeaf(20,75,15)
    pop()
  
    //pot
    push();
    directionalLight(203,75,67, -0.25, 0, -1);
    cylinder(100,100)
    
    push();
    translate(0,-50,0);
    cylinder(105,25)
  
    pop();
    pop();  
  }
  
  function drawLeaf(x,y,z) {
    directionalLight(0,255,0, -0.25, 0, -1);
    ellipsoid(x,y,z);
  }

  function drawWateringCan() {
    directionalLight(0, 150, 150, 0,0,-0.5);
    
    noStroke();
    cylinder(50,200,40);
    
    push();
    rotate(PI/4);
    translate(75,-80,-5);
    cylinder(5,225,10);
    pop()
    
    push()
    translate(-100,0);
    cylinder(5,100,10);
    pop()
    
    push()
    rotate(PI/2);
    translate(-30,50);
    cylinder(5,100,10);
    pop()
    
    push()
    rotate(PI/2);
    translate(30,50);
    cylinder(5,100,10);
    pop()
  
  }

  function drawPlantFeed(){
    fill('yellow');
    rect(50,100,100);
  }

  function drawTouch() {
    directionalLight(255, 0, 0, 0,0,-0.5);
    torus(100,25,50);
  
    rotate(PI/3);
    cylinder(25,180,10);
  }
let w = window.innerWidth;
let h = window.innerHeight; 

let roomBackgroundColors = { 
  morning: '#E5E7E9', 
  afternoon: '#E5E7E9', 
  evening: '#E5E7E9',
  night: '#191970'}

let roomColor;

let waterButton;
let touchButton;

function setup(){
//get the date to know the time of day, in hours
const date = new Date();
let hour = date.getHours();

createCanvas(w,h,WEBGL);

//touch button text, visible when button is pressed
let p = document.createElement('p');
p.innerHTML = 'Now, why would you touch a cactus?';
p.classList.add('left-text');
document.querySelector('.text-container').appendChild(p);
p.style.display = 'none';

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

waterButton = createButton('Water');
touchButton = createButton('Touch');

waterButton.addClass('button-54');
touchButton.addClass('button-54');

waterButton.position(w/2.5,h/1.15);
touchButton.position(w/1.85,h/1.15);

waterButton.mousePressed(() => {
  p.style.display = 'none';
  background(roomColor);
  translate(-300,-100);
    drawWateringCan(p);
});
touchButton.mousePressed(() => {
  background(roomColor);
  translate(-300,-100);
    drawTouch(p);
});

}

function draw(){
noStroke();

//draw plant
translate(0,100);
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

  function drawWateringCan(p) {
    p.style.display = 'none';

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

  function drawPlantFeed(p){
    fill('yellow');
    rect(50,100,100);
    p.style.display = 'none';
  }

  function drawTouch(p) {
    directionalLight(255, 0, 0, 0,0,-0.5);
    torus(100,25,50);
  
    rotate(PI/3);
    cylinder(25,180,10);
    p.style.display = 'flex';
  }
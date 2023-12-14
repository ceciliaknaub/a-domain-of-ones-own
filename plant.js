let w = window.innerWidth;
let h = window.innerHeight; 

let roomBackgroundColors = { 
  morning: '#E5E7E9', 
  afternoon: '#E5E7E9', 
  evening: '#E5E7E9',
  night: '#191970'}

let roomColor;

function setup(){
    createCanvas(w,h,WEBGL);
    let btncont = document.querySelector('.button-container');
    waterButton = createButton('Water');
    waterButton.addClass('back-link');

    feedButton = createButton('Feed');
    feedButton.addClass('back-link');

    waterButton.parent(btncont);
    feedButton.parent(btncont);
}

function draw(){
    //get the date to know the time of day, in hours
const date = new Date();
let hour = date.getHours();

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
    translate(-45,-60,0);
    drawLeaf(20,100,10)
    pop()
    
    push()
    translate(25,-40,0);
    drawLeaf(10,20,10)
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
  
    //let div = createElement('div')
    /*div.position(w/2.15,h/1.5);
    div.size(100,100);
    div.addClass('drag-over')
  
    let a = createA('http://www.google.com','')
    a.parent(div);*/
  
  }
  
  function drawLeaf(x,y,z) {
    directionalLight(0,255,0, -0.25, 0, -1);
    ellipsoid(x,y,z);
  }
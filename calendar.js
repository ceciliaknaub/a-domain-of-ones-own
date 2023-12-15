let w = window.innerWidth;
let h = window.innerHeight; 

let roomBackgroundColors = { 
  morning: '#E5E7E9', 
  afternoon: '#E5E7E9', 
  evening: '#E5E7E9',
  night: '#191970'}

let roomColor;
let scheduleButton;
let calendar;
let userInput;

function preload() {
  calendar = loadImage('./assets/calendar.jpg');
}

function setup(){
//get the date to know the time of day, in hours
const date = new Date();
let hour = date.getHours();

createCanvas(w,h);
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

//create input box
let inp = createInput('Type here');
let inpDiv = document.createElement('div');
inp.parent(inpDiv);
background(roomColor);

//style and format it
inpDiv.classList.add('left-text');
document.querySelector('.text-container').appendChild(inpDiv);

//draw calendar image
image(calendar,w/3,h/4,500,350);

inp.input(() => {
  userInput = inp.value();
  sessionStorage.calendarEvent = userInput;
});

//create button
scheduleButton = createButton('Schedule');
scheduleButton.addClass('button-54');
scheduleButton.position(w/2.15,h/1.25);

scheduleButton.mousePressed(() => {
  fill('pink');
  noStroke();
  rect(w/2,h/1.9 - 50,50,50);
})
}

function draw() {
};

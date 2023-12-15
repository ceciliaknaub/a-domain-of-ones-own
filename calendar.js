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
background(roomColor);

scheduleButton = createA('https://calendar.google.com/calendar/u/1?cid=YS5kb21haW4ub2Yub25lcy5vd24ucHJvamVjdEBnbWFpbC5jb20','Schedule');
scheduleButton.addClass('button-54');
scheduleButton.position(w/2.15,h/1.25);

let p = document.createElement('p');
p.innerHTML = "Add to the calendar using the schedule button. Get coffee with a friend. Make an appointment to get a haircut. Delete every event on a Friday. It's up to you.";
p.classList.add('index-bookmark');
document.querySelector('.text-container').appendChild(p);


scheduleButton.mousePressed(() => {

});
}

function draw() {
  image(calendar,w/3,h/4,500,350);
}
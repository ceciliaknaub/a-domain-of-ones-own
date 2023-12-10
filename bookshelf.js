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
let clickCount = 0;

let objects = []
let books = [];
let test;
let returnButton;
let bookmarkButton;

class Book {
  constructor (w, h ,x ,y,img,title,author,font,textColor) {
      this.w = w,
      this.h = h,
      this.x = x,
      this.y = y,
      this.img = img,
      this.title = title,
      this.author = author,
      this.font = font,
      this.textColor = textColor
    }

    bookClicked() {
      if ((mouseX > this.x) && (mouseX < this.x+this.w) &&
	    (mouseY > this.y) && (mouseY < this.y+this.h)) {
        //clickCount += 1;
        removeElements();
        background(roomColor);
        bookmarkText(this.title,this.author,w/2,50);

        //return button clears all book text
        returnButton = createButton('Return')
        returnButton.position(w/2,500);
        returnButton.mousePressed(() => {
          removeElements();
          background(roomColor);
          });
               
        //bookmark button creates a shape and saves the text to the array
        bookmarkButton = createButton('Bookmark')
        bookmarkButton.position(w/1.25,500)
        bookmarkButton.mousePressed(() => {
          fill('yellow');
          rect(w/1.45,100,50,50);
                  })
      }
    }

    drawBook() {
      push();
        image(this.img,this.x,this.y);
        //rect(this.x,this.y,this.w,this.h);
        push();
        textFont(this.font);
        fill(this.textColor);
        translate(this.x + this.w/2,this.y + this.h/1.75);
        rotate(PI/2);
        textAlign(CENTER);
        textSize(14);
        text(this.title,0, 5);
        textSize(18);
        text(this.author,-150, 5);
    pop();
    }

}
function preload(){
  //images
  book1 = loadImage('./assets/to_the_lighthouse_cover.png');
  book2 =  loadImage('./assets/shoe_dog_cover.png');
  book3 = loadImage('./assets/didion_cover.png');
  book4 = loadImage('./assets/bell_hooks_cover.png');
  //book_backround = loadImage('./assets/book_background.png')

  //fonts
  font1 = loadFont('./assets/Junge/Junge-Regular.ttf');
  font2 = loadFont('./assets/Hind/Hind-Bold.ttf');
}
let book;

function setup() {
  const date = new Date();
  let hour = date.getHours();

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
  createCanvas(w,h);
  background(roomColor);


  append(books,new Book(50, 400, w/4, h/4 - 25, book1,'To The Lighthouse','Virginia Wolf',font1,255));
  append(books, new Book(70,450,w/4 + 50, h/4 - 75, book2,'SHOE DOG','Phil Knight',font2,'#A9672A'));
  append(books, new Book(45,375, w/4 + 120, h/4,book3,'The Year of Magical Thinking','Joan Didion',font1,'black'));
  append(books, new Book(45,375, w/4 + 160, h/4,book4,'all about love','bell hooks',font1,'black'));

}

function draw(){

  noStroke();

  for (i = 0; i < books.length; i++) {
    book = books[i];
    book.drawBook();
  }
}

function mousePressed() {
    for (i = 0; i < books.length; i++) {
        book = books[i];
        book.bookClicked();
    } 
  }

function bookmarkText(title,author,x,y) {

  let p1 = createElement('p',title + ' ' + author)
  p1.position(x, y);
  p1.addClass('book-left');

  let p2 = createElement('p',title + ' ' + author);
  p2.position(x + 300, y);
  p2.addClass('book-right');
  //text(title + ' ' + author,x,y);

  //let img = createImg('./assets/book_background.png','white book pages');
  //img.position(x + 60,y + 25);

  beginShape();
  translate(x,y);
  fill('white');
  vertex(50,50);
  vertex(50,400);
  vertex(250,385);
  vertex(450,400);
  vertex(450,50);
  vertex(250,75);
  endShape();
};

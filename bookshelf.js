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
let returnCount = 0;

let books = [];
let bookmarks = [];
let quotes = {
  woolf: ["About here, she thought, dabbling her fingers in the water, a ship had sunk, and she muttered, dreamily half asleep, how we perished, each alone.",
  "Beauty was not everything. Beauty had this penalty — it came too readily, came too completely. It stilled life — froze it.",
  "She felt... how life, from being made up of little separate incidents which one lived one by one, became curled and whole like a wave which bore one up with it and threw one down with it, there, with a dash on the beach.",
  "But nevertheless, the fact remained, it was almost impossible to dislike anyone if one looked at them."],
  knight: ["Have faith in yourself, but also have faith in faith. Not faith as others define it. Faith as you define it. Faith as faith defines itself in your heart."],
  didion: ["We are imperfect mortal beings, aware of that mortality even as we push it away, failed by our very complication, so wired that when we mourn our losses we also mourn, for better or for worse, ourselves. As we were. As we are no longer. As we will one day not be at all.",
"Grief is different. Grief has no distance. Grief comes in waves, paroxysms, sudden apprehensions that weaken the knees and blind the eyes and obliterate the dailiness of life."],
hooks: ["But many of us seek community solely to escape the fear of being alone. Knowing how to be solitary is central to the art of loving. When we can be alone, we can be with others without using them as a means of escape.",
"Individuals who want to believe that there is no fulfillment in love, that true love does not exist, cling to these assumptions because this despair is actually easier to face than the reality that love is a real fact of life but is absent from their lives.",
"To love well is the task in all meaningful relationships, not just romantic bonds.",
"Giving generously in romantic relationships, and in all other bonds, means recognizing when the other person needs our attention. Attention is an important resource.",
"Choosing to be honest is the first step in the process of love. There is no practitioner of love who deceives. Once the choice has been made to be honest, then the next step on love's path is communication."]
}

let test;
let returnButton;
let bookmarkButton;
let x = 50;


class Book {
  constructor (w, h ,x ,y,img,title,author,font,textColor,quotes) {
      this.w = w,
      this.h = h,
      this.x = x,
      this.y = y,
      this.img = img,
      this.title = title,
      this.author = author,
      this.font = font,
      this.textColor = textColor
      this.quotes = quotes
    }

    bookClicked() {
      if ((mouseX > this.x) && (mouseX < this.x+this.w) &&
	    (mouseY > this.y) && (mouseY < this.y+this.h)) {
        clickCount += 1;
        removeElements();
        background(roomColor);

        //Get the quotes array length and generate a random quote for each book
        let arrayLength = this.quotes.length;

        let arrayPos = int(random(0,arrayLength-1));

        bookmarkText(this.title, this.author, this.quotes[arrayPos],w/2,50);

        //return button clears all book text
        returnButton = createButton('Return');
        returnButton.position(w/2,500);
        returnButton.addClass('button-54');
        returnButton.mousePressed(() => {
          removeElements();
          background(roomColor);
           /*clear();
         if (returnCount > 0) {
            clear();
            background(roomColor);
          }
          for (i = 50; i < 200; i+=5) {
              push();
              stroke('black');
              beginShape();
              translate(w/2,50);
              vertex(i,50);
              vertex(i,400);
              vertex(250,385);
              vertex(450,400);
              vertex(450,50);
              vertex(250,75);
              endShape();
            pop();
            //console.log('return loop:' + ' ' + returnCount);
        }*/
      });
               
        //bookmark button creates a shape and saves the text to the bookmarks array
        bookmarkButton = createButton('Bookmark');
        bookmarkButton.position(w/1.25,500);
        bookmarkButton.addClass('button-54');

        bookmarkButton.mousePressed(() => {
          fill('yellow');
          rect(w/1.45,100,50,50);
          //append(bookmarks,this.title);
          //storeItem('bookmark'+bookmarkCount,this.quotes[arrayPos]);
          append(bookmarks,this.quotes[arrayPos])
                  })
                  //console.log(this.quotes[arrayPos]);
      }

      //Remove duplicates from the Bookmarks array
      let filteredBookmarks = Array.from(new Set(bookmarks));
      //console.log(filteredBookmarks);
      //Convert array to string
      let stringifiedBookmarks = JSON.stringify(filteredBookmarks);

      localStorage.setItem(
        "bookmarks",
        stringifiedBookmarks
      )
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
createCanvas(w,h);

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

background(roomColor);

//creates new Book objects

  append(books,new Book(50, 400, w/4, h/4 - 25, book1,'To The Lighthouse','Virginia Woolf',font1,255,quotes.woolf));
  append(books, new Book(70,450,w/4 + 50, h/4 - 75, book2,'SHOE DOG','Phil Knight',font2,'#A9672A',quotes.knight));
  append(books, new Book(45,375, w/4 + 120, h/4,book3,'The Year of Magical Thinking','Joan Didion',font1,'black',quotes.didion));
  append(books, new Book(45,375, w/4 + 160, h/4,book4,'all about love','bell hooks',font1,'black',quotes.hooks));

}

function draw(){

  noStroke();

  //draw books 
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

function bookmarkText(title,author,quote,x,y) {

  //add title and author to the left page
  let h2 = createElement('h2', title)
  h2.position(x, y);
  h2.addClass('book-left');

  let h3 = createElement('h3',author)
  h3.position(x, y+100);
  h3.addClass('book-left');

  //add a quote to the right page
  let p2 = createElement('p',quote);
  p2.position(x + 250, y);
  p2.addClass('book-right');


  //Draw the white book page
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
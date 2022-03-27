"use strict"

let myLibrary = [];

let formContainer = document.querySelector('.container');
let form          = document.querySelector("form");
let addBookBtn    = document.querySelector(".library .add-btn");
let addFormBtn    = document.querySelector("form .add button");
let closeFormBtn  = document.querySelector("form .cancel-btn")
let overlay       = document.querySelector(".overlay");
let deleteBookCardBtn;

addBookBtn.addEventListener("click", addBookToLibrary);
addFormBtn.addEventListener("click", addBookForm);
closeFormBtn.addEventListener("click", closeBookForm);

//delete bookcard from both, webpage and myLibrary Array
document.body.addEventListener("click", (e) => {
  if(e.target.className=="delete" || e.target.className=="delete-cross") {
    let bookTitle = e.target.closest(".book-card").querySelector(".title").value;
    for(let i=0; i < myLibrary.length; i++) {
      let item = myLibrary[i];
      if(item.title == bookTitle){
        myLibrary.splice(i, 1);
      }
    }
    e.target.closest(".book-card").remove();
  }
  console.log(myLibrary);
})

function Book({title="Title", author="Author", pages=0, isRead=false}) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

//"add" button in form
function addBookForm(event) {
  //prevent the form to submit data
  event.preventDefault();

  let title, author, pages, isRead;

  title  = form.querySelector("#title").value;
  author = form.querySelector("#author").value;
  pages  = form.querySelector("#pages").value;
  isRead = form.querySelector("#read-status").checked;

  for(let i = 0; i < myLibrary.length; i++) {
    let item = myLibrary[i];
    if(item.title == title){
      alert(`Oops! ${title} has already been added!`);

      formContainer.style.visibility = "hidden";
      overlay.classList.remove("active");
      return;
    }
  } 

  let book = new Book({title, author, pages, isRead});
  myLibrary.push(book);
  formContainer.style.visibility = "hidden";

  overlay.classList.remove("active");

  createBookCard();
}

//main button for adding books to library
function addBookToLibrary() {
  formContainer.style.visibility = "visible";
  overlay.classList.add("active");
  form.style.backgroundColor = "#fff";
}

//"close" button in form
function closeBookForm() {
  formContainer.style.visibility = "hidden";
  overlay.classList.remove("active");
}

function createBookCard() {
  let latestBook  = myLibrary[myLibrary.length-1];
  let newBookCard = document.createElement("div");

  let bookTitle   = document.createElement("div");
  let preposition = document.createElement("div");
  let bookAuthor  = document.createElement("div");
  let pages       = document.createElement("div");
  let readStatus  = document.createElement("div");
  let deleteCard  = document.createElement("div");

  newBookCard.classList.add("book-card");
  preposition.classList.add("preposition");
  bookAuthor.classList.add("author");
  bookTitle.classList.add("title");
  pages.classList.add("pages");
  readStatus.classList.add(latestBook.isRead ? "read-status" : "not-read-status");
  deleteCard.classList.add("delete");

  bookTitle.innerText   = latestBook.title;
  preposition.innerText = "by";
  bookAuthor.innerText  = latestBook.author;
  pages.innerText       = "Pages: " + latestBook.pages;
  readStatus.innerText  = latestBook.isRead ? "Read" : "Not Read";

  let span = document.createElement("span");
  span.classList.add("delete-cross");
  deleteCard.append(span);

  newBookCard.append(bookTitle);
  newBookCard.append(preposition);
  newBookCard.append(bookAuthor);
  newBookCard.append(pages);
  newBookCard.append(readStatus);
  newBookCard.append(deleteCard);

  addBookBtn.before(newBookCard);
}

"use strict"

let myLibrary = [];

let formContainer = document.querySelector('.container');
let form = document.querySelector("form");
let addBookBtn = document.querySelector(".library .add-btn");
let addFormBtn = document.querySelector("form .add button");
let closeFormBtn = document.querySelector("form .cancel-btn")
let overlay = document.querySelector(".overlay");

addBookBtn.addEventListener("click", addBookToLibrary);
addFormBtn.addEventListener("click", addBookForm);
closeFormBtn.addEventListener("click", closeBookForm);

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

//"add" button in form
function addBookForm(event) {
  event.preventDefault();

  let title, author, pages, isRead;

  title  = form.querySelector("#title").value;
  author = form.querySelector("#author").value;
  pages  = form.querySelector("#pages").value;
  isRead = form.querySelector("#read-status").checked;

  let book = new Book(title, author, pages, isRead);
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
  let read        = document.createElement("div");
  let notRead     = document.createElement("div");
  let deleteCard  = document.createElement("div");

  

  newBookCard.classList.add("book-card");
  addBookBtn.before(newBookCard);
}
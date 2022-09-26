"use strict"

let myLibrary = [];

const formContainer = document.querySelector('.container');
const form          = document.querySelector("form");
const addBookBtn    = document.querySelector(".library .add-btn");
const addFormBtn    = document.querySelector("form .add button");
const closeFormBtn  = document.querySelector("form .cancel-btn")
const overlay       = document.querySelector(".overlay");

const titleInput    = formContainer.querySelector(".title input");
const authorInput   = formContainer.querySelector(".author input");
const pagesInput    = formContainer.querySelector(".pages input");

let formError = false;
let deleteBookCardBtn;

addBookBtn.addEventListener("click", addBookToLibrary);
pagesInput.addEventListener("input", validateForm);
addFormBtn.addEventListener("click",  validateSubmitForm);
closeFormBtn.addEventListener("click", closeBookForm);
addFormBtn.addEventListener("click", addBookForm);
titleInput.addEventListener("input", validateForm);
authorInput.addEventListener("input", validateForm);


//delete bookcard from both, webpage and myLibrary Array
document.body.addEventListener("click", (e) => {
  if(e.target.className=="delete" || e.target.className=="delete-cross") {
    let bookCard = e.target.closest(".book-card");
    let bookTitle = bookCard.querySelector(".title").innerText;

    for(let i=0; i < myLibrary.length; i++) {
      let item = myLibrary[i];
      if(item.title == bookTitle){
        myLibrary.splice(i, 1);
      }
    }
    e.target.closest(".book-card").remove();
  }

  //toogle read-status of book
  if(e.target.className == "read-status"){
    let bookTitle = e.target.closest(".book-card").querySelector(".title").innerText;

    for(let i=0; i < myLibrary.length; i++) {
      let item = myLibrary[i];
      if(item.title == bookTitle){
        item.isRead = !item.isRead;
        e.target.innerText = (item.isRead == true) ? "Read" : "Not Read";
      }
    }
  }

})

function Book({title="Title", author="Author", pages=0, isRead=false}) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

//"add" button in form
function addBookForm(event) {
  event.preventDefault();
  if(!formError) {
    //prevent the form to submit data
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

  form.querySelector("#title").value  = "";
  form.querySelector("#author").value = "";
  form.querySelector("#pages").value  = "";
  form.querySelector("#read-status").checked = false;

  if(formContainer.querySelector(".title .validation_area .required"))
    formContainer.querySelector(".title .validation_area .required").remove();
  if(formContainer.querySelector(".author .validation_area .required"))
    formContainer.querySelector(".author .validation_area .required").remove();
  if(formContainer.querySelector(".pages .validation_area .required"))
    formContainer.querySelector(".pages .validation_area .required").remove();

  formContainer.querySelector("#title").classList.remove("error-input-box", "correct-input-box");
  formContainer.querySelector("#author").classList.remove("error-input-box", "correct-input-box");
  formContainer.querySelector("#pages").classList.remove("error-input-box", "correct-input-box");
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
  readStatus.classList.add("read-status");
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

//form validation
//add live form validation function
function validateForm() {
  //check for validity
  if(titleInput.validity.patternMismatch) {
    titleInput.classList.add("error-input-box");
    formContainer.querySelector(".title .validation_area").classList.add("error-validation-area");
    formContainer.querySelector(".title .validation_area").classList.remove("correct-validation-area");
    titleInput.classList.remove("correct-input-box");
    
    formError = true;
  } 
  else if(titleInput.value!=""){
    titleInput.classList.add("correct-input-box");
    formContainer.querySelector(".title .validation_area").classList.add("correct-validation-area");
    formContainer.querySelector(".title .validation_area").classList.remove("error-validation-area");
    titleInput.classList.remove("error-input-box");
    
    formError = false;
  } 
  else if(titleInput.value==""){
    titleInput.classList.remove("error-input-box correct-input-box");
    formContainer.querySelector(".title .validation_area").classList.remove("correct-validation-area error-validation-area");
    
    formError = true;
  }

  if(authorInput.validity.patternMismatch) {
    authorInput.classList.add("error-input-box");
    authorInput.classList.remove("correct-input-box");
    formContainer.querySelector(".author .validation_area").classList.add("error-validation-area");
    formContainer.querySelector(".author .validation_area").classList.remove("correct-validation-area");
    
    formError = true;
  } 
  else if(authorInput.value!=""){
    authorInput.classList.add("correct-input-box");
    authorInput.classList.remove("error-input-box");
    formContainer.querySelector(".author .validation_area").classList.add("correct-validation-area");
    formContainer.querySelector(".author .validation_area").classList.remove("error-validation-area");
    
    formError = false;
  } 
  else if(authorInput.value==""){
    authorInput.classList.remove("error-input-box correct-input-box");
    formContainer.querySelector(".author .validation_area").classList.remove("correct-validation-area error-validation-area");
    
    formError = true;
  }

  if(pagesInput.validity.rangeUnderflow || pagesInput.validity.rangeOverflow) {
    pagesInput.classList.add("error-input-box");
    pagesInput.classList.remove("correct-input-box");
    formContainer.querySelector(".pages .validation_area").classList.add("error-validation-area");
    formContainer.querySelector(".pages .validation_area").classList.remove("correct-validation-area");

    formError = true;
  }
  else if(pagesInput.value!="") {
    pagesInput.classList.add("correct-input-box");
    pagesInput.classList.remove("error-input-box");
    formContainer.querySelector(".pages .validation_area").classList.add("correct-validation-area");
    formContainer.querySelector(".pages .validation_area").classList.remove("error-validation-area");
    
    formError = false;
  } 
  else if(pagesInput.value=="") {
    pagesInput.classList.remove("error-input-box correct-input-box");
    formContainer.querySelector(".pages .validation_area").classList.remove("correct-validation-area error-validation-area");
    
    formError = true;
  }
}

function validateSubmitForm() {
  //check for validity
  function _checkMissingError(input) {
    if(input.validity.valueMissing) {
      input.classList.add("error-input-box");
      
      formError = true;

      const required = document.createElement("div");
      required.classList.add("error-validation-area","required");
      required.innerHTML = "<span>&#8226;</span> This is required field!";
      return required;
    }
  }

  if(titleInput.validity.valueMissing) {
    if(!document.querySelector(".title .error-validation-area")){
      let required =  _checkMissingError(titleInput);
      formContainer.querySelector(".title .validation_area").append(required);
    }
  }
  else {
    formError = false;
  }

  if(authorInput.validity.valueMissing) {
    if(!document.querySelector(".author .error-validation-area")){
      let required =  _checkMissingError(authorInput);
      formContainer.querySelector(".author .validation_area").append(required);
    }
  }
  else {
    formError = false;
  }

  if(pagesInput.validity.valueMissing) {
    if(!document.querySelector(".pages .error-validation-area")){
      let required =  _checkMissingError(pagesInput);
      formContainer.querySelector(".pages .validation_area").append(required);
    }
  }
  else {
    formError = false;
  }
}
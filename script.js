"use strict"

let myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = (isRead == "yes") ? true : (isRead == "no" ? false : "error");
}

function addBookToLibrary() {
   let title, author, pages, isRead;
 
   title = prompt("Enter book title: ", "title");
   author = prompt("Enter book author: ", "author name");
   pages = +prompt("Enter number of pages in book: ", 0);
   isRead = prompt("Have you already read the book? (Yes/No): ").toLowerCase();

   let book = new Book(title, author, pages, isRead);
   myLibrary.push(book);
}
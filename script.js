const books = [];
const form = document.querySelector('form');
const title = document.querySelector('title');
const author = document.querySelector('author');
const submit = document.querySelector('submit')

function newBook() {
  let book = {};
  book = {
    title: title;
    author: author
  }
  books.push(book);
}
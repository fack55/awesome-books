// const form = document.querySelector('#form');
// const title = document.getElementById('title');
// const author = document.getElementById('author');
// const bookList = document.getElementById('books-list');
// let collection = JSON.parse(localStorage.getItem('collection')) || [];
// let book = [{
//   title: 'Alpen',
//   author: 'Zalpen',
//   id: 1234574,
// }];

// function newBook() {
//   book = {
//     title: title.value,
//     author: author.value,
//     idNumber: Math.floor(Math.random() * 1000000),
//   };
//   collection.push(book);
//   localStorage.setItem('collection', JSON.stringify(collection));
// }

// function deleteBook(idNumber) {
//   collection = collection.filter((books) => books.idNumber !== idNumber);
//   localStorage.setItem('collection', JSON.stringify(collection));
// }

// function printCollection(book) {
//   const tableRow = document.createElement('tr');
//   const newTitle = document.createElement('td');
//   const newAuthor = document.createElement('td');
//   const deleteButton = document.createElement('button');
//   newTitle.innerText = book.title;
//   newAuthor.innerText = book.author;
//   deleteButton.innerHTML = 'Delete';
//   tableRow.append(newTitle, newAuthor, deleteButton);
//   bookList.append(tableRow);
//   deleteButton.addEventListener('click', () => {
//     deleteButton.parentElement.remove();
//     deleteBook(book.idNumber);
//   });
// }

// collection.forEach(printCollection);

// form.addEventListener('submit', (event) => {
//   event.preventDefault();
//   if (title.value !== '' && author.value !== '') {
//     newBook();
//     printCollection(book);
//     form.reset();
//   } else {
//     // alert('Enter valid values for title and author fields, please.');
//   }
// });

// select the items
const form = document.querySelector('#form');
const title = document.getElementById('title');
const author = document.getElementById('author');
const bookList = document.getElementById('books-list');

class Books {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  storeData() {
    const bookTitle = title.value;
    const bookAuthor = author.value;
    const book = new Books(bookTitle, bookAuthor);
    // Check if local storage is empty
    if (localStorage.getItem('books') === null) {
      const bookContainer = [];
      bookContainer.push(book);
      localStorage.setItem('books', JSON.stringify(bookContainer));
    } else {
      const bookContainerStr = localStorage.getItem('books');
      const bookArray = JSON.parse(bookContainerStr);
      bookArray.push(book);
      localStorage.setItem('books', JSON.stringify(bookArray));
    }
    // Clear input
    title.value = '';
    author.value = '';
    this.displayBooks();
  }

  displayBooks() {
    const wrapper = document.createElement('div');
    const line = document.createElement('hr');
    const bookContainerStr = localStorage.getItem('books');
    const tits = document.createElement('div');
    tits.innerText = this.author;
    const bookArray = JSON.parse(bookContainerStr);
    bookArray.forEach((element, index) => {
      const displayTitle = document.createElement('p');
      const displayAuth = document.createElement('p');
      const deleteBtn = document.createElement('div');
      const container = document.createElement('div');
      const words = document.createElement('div');
      // set attributes
      displayTitle.innerText = `"${element.title}" by`;
      displayAuth.innerText = element.author;
      deleteBtn.innerHTML = `<button class="btn borders" onclick='deleteItem(${index})'>Remove</button>`;
      deleteBtn.classList.add('deleteBook');
      container.classList.add('flexing', 'centers');
      words.classList.add('flexing');
      displayAuth.classList.add('word');
      // apend children
      words.appendChild(displayTitle);
      words.appendChild(displayAuth);
      container.appendChild(words);
      container.appendChild(deleteBtn);
      wrapper.appendChild(container);
    });
    line.classList.add('line');
    bookList.appendChild(wrapper);
    bookList.appendChild(line);
  }

  removeBook(index) {
    const bookContainerStr = localStorage.getItem('books');
    const bookArray = JSON.parse(bookContainerStr);
    bookArray.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(bookArray));
    bookList.innerHTML = '';
    this.displayBooks();
  }
}

/* Steve here  */

// what happens when a person presses submit
form.addEventListener('submit', (event) => {
  event.preventDefault();
  // Check if title and author field is empty or not
  if (title.value === '' || author.value === '') {
    title.setAttribute('placeholder', 'title');
    author.setAttribute('placeholder', 'author');
  } else {
    bookList.innerHTML = '';
    const book = new Books();
    book.storeData();
  }
});

const bigBook = new Books();
const deleteItem = (id) => {
  bigBook.removeBook(id);
};

// eslint-disable-next-line no-constant-condition
if ('cl' === 'clz') {
  deleteItem(1);
}

window.addEventListener('load', bigBook.displayBooks());
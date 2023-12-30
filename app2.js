class Book {
  constructor(
    title = "Unknown",
    author = "Unknown",
    pages = "0",
    isRead = false
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(newBook) {
    if (!this.isInLibrary(newBook)) {
      this.books.push(newBook);
    }
  }

  removeBook(title) {
    this.books = this.books.filter((book) => book.title != title);
  }

  getBook(title) {
    return this.books.find((book) => book.title === title);
  }

  isInLibrary(newBook) {
    return this.books.some((book) => book.title === newBook.title);
  }
}

const library = new Library();

// user interface

const addBookBtn = document.querySelector(".open-add-btn");
const addBookSection = document.querySelector(".add-book-section");
const addBookModal = document.querySelector(".modal");
const closeModalBtn = document.querySelector(".close-btn");
const booksGrid = document.querySelector(".display-books");
const addBookForm = document.querySelector(".add-book-form");

const openAddBookModal = () => {
  addBookSection.classList.add("show-add-book");
  addBookModal.classList.add("show-modal");
};

const closeAddBookModal = () => {
  addBookSection.classList.remove("show-add-book");
  addBookModal.classList.remove("show-modal");
};

const getBookFromInput = () => {
  const title = document.querySelector(".title-input").value;
  const author = document.querySelector(".author-input").value;
  const pages = document.querySelector(".pages-input").value;
  const isRead = document.querySelector(".read").value;
  return new Book(title, author, pages, isRead);
};

const addBook = (e) => {
  e.preventDefault();
  const newBook = getBookFromInput();
  if (library.isInLibrary(newBook)) {
    alert("This book already exists in your library.");
    return;
  }

  library.addBook(newBook);
  updateBooksGrid();
  closeAddBookModal();
  addBookForm.reset();
};

const removeBook = (e) => {
  const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll(
    '"',
    ""
  );
  library.removeBook(title);
  updateBooksGrid();
};

const toggleRead = (e) => {
  const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll(
    '"',
    ""
  );
  const book = library.getBook(title);

  book.isRead = !book.isRead;

  updateBooksGrid();
};

const updateBooksGrid = () => {
  resetBooksGrid();
  for (let book of library.books) {
    console.log(book);
    createBookCard(book);
  }
};

const resetBooksGrid = () => {
  booksGrid.innerHTML = "";
};

const createBookCard = (book) => {
  const bookCard = document.createElement("div");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const buttonGroup = document.createElement("div");
  const readBtn = document.createElement("button");
  const removeBtn = document.createElement("button");

  bookCard.classList.add("card");
  buttonGroup.classList.add("button-group");
  readBtn.classList.add("btn");
  readBtn.onclick = toggleRead;
  removeBtn.onclick = removeBook;

  title.textContent = `"${book.title}"`;
  author.textContent = book.author;
  pages.textContent = `${book.pages} pages`;
  removeBtn.textContent = "Remove";

  if (book.isRead) {
    readBtn.textContent = "Read";
    readBtn.classList.add("btn-light-green");
  } else {
    readBtn.textContent = "Not read";
    readBtn.classList.add("btn-light-red");
  }
  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  buttonGroup.appendChild(readBtn);
  buttonGroup.appendChild(removeBtn);
  bookCard.appendChild(buttonGroup);
  booksGrid.appendChild(bookCard);
};

// event listeners

addBookBtn.addEventListener("click", openAddBookModal);
addBookModal.onclick = closeAddBookModal;
closeModalBtn.onclick = closeAddBookModal;
addBookForm.onsubmit = addBook;

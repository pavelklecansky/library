let myLibrary = [];

const newBookButton = document.querySelector("#newBookButton");
newBookButton.addEventListener("click", openForm);

const cancelFormButton = document.querySelector("#cancelFormButton");
cancelFormButton.addEventListener("click", cancelForm);

const blocker = document.querySelector(".blocker");
blocker.addEventListener("click", cancelForm);

const addBookButton = document.querySelector("#addBookButton");
addBookButton.addEventListener("click", () => {
  const book = readBookFromInputs();
  addBookToLibrary(book);
  clearFormes();
});

function loadFromLocalStorage() {
  myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
}

function saveToLocalStorage() {
  const myLibString = JSON.stringify(myLibrary);
  localStorage.setItem("myLibrary", myLibString);
}

function clearFormes() {
  document.querySelector("#titleInput").value = "";
  document.querySelector("#authorInput").value = "";
  document.querySelector("#numberInput").value = "";
  document.querySelector("#readInput").checked = false;
}

function readBookFromInputs() {
  const title = document.querySelector("#titleInput").value;
  const author = document.querySelector("#authorInput").value;
  const numberOfPages = Number(document.querySelector("#numberInput").value);
  const read = document.querySelector("#readInput").checked;
  const book = new Book(title, author, numberOfPages, read);
  return book;
}
function deleteBook(book) {
  let indexOfBook = myLibrary.indexOf(book);
  myLibrary.splice(indexOfBook, 1);
  saveToLocalStorage();
  displayBooksInLibrary();
}

function createDeleteBookButton(book) {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("btn", "cancel");
  deleteButton.addEventListener("click", () => deleteBook(book));
  return deleteButton;
}

function createReadBookToogle(book) {
  const readCheckBox = document.createElement("input");
  readCheckBox.type = "checkbox";
  readCheckBox.checked = book.read;
  readCheckBox.addEventListener("change", function toggleRead() {
    book.read = !book.read;
  });

  return readCheckBox;
}

function displayBook(book) {
  let bookProperties = Object.keys(book);
  let tableBody = document.querySelector("#table tbody");
  let bookRow = tableBody.insertRow(tableBody.rows.length);
  let propertiesLenght = bookProperties.length;
  for (let index = 0; index < propertiesLenght - 1; index++) {
    const newCell = bookRow.insertCell(index);
    const newText = document.createTextNode(book[bookProperties[index]]);
    newCell.appendChild(newText);
  }
  const readCell = bookRow.insertCell(propertiesLenght - 1);
  readCell.appendChild(createReadBookToogle(book));

  const newCell = bookRow.insertCell(propertiesLenght);
  newCell.appendChild(createDeleteBookButton(book));
}

function displayBooksInLibrary() {
  //clean all book
  document.querySelector("#table tbody").innerHTML = "";

  for (const book of myLibrary) {
    displayBook(book);
  }
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}`;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
  saveToLocalStorage();
  displayBooksInLibrary();
}

function openForm() {
  document.querySelector("#newBookForm").style.display = "block";
}

function cancelForm() {
  document.querySelector("#newBookForm").style.display = "none";
}

loadFromLocalStorage();
displayBooksInLibrary();

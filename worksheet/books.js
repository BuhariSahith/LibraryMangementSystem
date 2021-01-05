addBooks();
let form = document.getElementById("form");
let isbn = document.getElementById("isbn");
let book = document.getElementById("bookname");
let author = document.getElementById("author");
let publisher = document.getElementById("publisher");
let quantity = document.getElementById("quantity");
let addbookbtn = document.getElementById("addbookbtn");
let savebookbtn = document.getElementById("savebookbtn");
let deleteModalBtn = document.getElementById("deleteModalId");

addbookbtn.addEventListener("click", (event) => {
  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  }
  form.classList.add("was-validated");

  //local storage
  if (
    (isbn.value.trim() &&
      book.value.trim() &&
      author.value.trim() &&
      publisher.value.trim() &&
      quantity.value.trim()) != 0
  ) {
    bookObj = {
      id: 0,
      isbn: isbn.value,
      bookname: book.value,
      author: author.value,
      publisher: publisher.value,
      quantity: quantity.value,
      issuedbooks: 0,
    };
    let webtask = localStorage.getItem("localbooks");
    if (webtask == null) {
      books = [];
    } else {
      books = JSON.parse(webtask);
    }
    books.push(bookObj);
    isbn.value = "";
    book.value = "";
    author.value = "";
    publisher.value = "";
    quantity.value = "";
  } else {
    alert("enter all fields");
  }
  //let table = document.getElementById("booklist");
  //let html = "";
  localStorage.setItem("localbooks", JSON.stringify(books));
  console.log(books);
  addBooks();
});

function addBooks() {
  let webtask = localStorage.getItem("localbooks");
  if (webtask == null) {
    books = [];
  } else {
    books = JSON.parse(webtask);
  }
  //get the table body
  let bookHtml = "";
  let booklist = document.getElementById("booklist");
  books.forEach((book, index) => {
    bookHtml += `<tr>
<th scope="row">${index + 1}</th>
<td>${book.isbn}</td>
<td>${book.bookname}</td>
<td>${book.author}</td>
<td>${book.publisher}</td>
<td>${book.quantity}</td>
<td>${book.issuedbooks}</td>
<td colspan="2">
<button type="button" class="btn btn-primary" onclick="editBookInfo(${index})">
Edit
</button>
<button type="button" id="myBtn" class="btn btn-danger"  onclick="onOpenModal(${index})">
Delete
</button>
</td>
</tr>`;
  });
  booklist.innerHTML = bookHtml;
}

//edit book details
function editBookInfo(index) {
  saveindex.value = index;
  let webtask = localStorage.getItem("localbooks");
  let books = JSON.parse(webtask);

  //id.value = array[index].key/propertyname
  isbn.value = books[index].isbn;
  book.value = books[index].bookname;
  author.value = books[index].author;
  publisher.value = books[index].publisher;
  quantity.value = books[index].quantity;
  addbookbtn.style.display = "none";
  savebookbtn.style.display = "block";
}

//save book info

savebookbtn.addEventListener("click", (e) => {
  e.preventDefault();
  let webtask = localStorage.getItem("localbooks");
  let books = JSON.parse(webtask);
  let saveindex = document.getElementById("saveindex").value;
  books[saveindex].isbn = isbn.value;
  books[saveindex].bookname = book.value;
  books[saveindex].author = author.value;
  books[saveindex].publisher = publisher.value;
  books[saveindex].quantity = quantity.value;
  localStorage.setItem("localbooks", JSON.stringify(books));
  addbookbtn.style.display = "block";
  savebookbtn.style.display = "none";
  isbn.value = "";
  book.value = "";
  author.value = "";
  publisher.value = "";
  quantity.value = "";

  addBooks();
});

function onOpenModal(index) {
  exampleModal.style.display = "block";
  deleteModalBtn.setAttribute("data-deleteId", index);
}

function deleteBookInfo(event) {
  exampleModal.style.display = "none";
  var tableRow = event.target.getAttribute("data-deleteId");
  let webtask = localStorage.getItem("localbooks");
  let books = JSON.parse(webtask);
  books.splice(tableRow, 1);
  localStorage.setItem("localbooks", JSON.stringify(books));
  isbn.value = "";
  book.value = "";
  author.value = "";
  publisher.value = "";
  quantity.value = "";
  addbookbtn.style.display = "block";
  savebookbtn.style.display = "none";

  addBooks();
}

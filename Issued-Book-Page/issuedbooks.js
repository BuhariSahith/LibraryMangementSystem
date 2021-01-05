const userSelection = document.getElementById("userDropDown"),
  bookSelection = document.getElementById("bookDropDown"),
  inputCount = document.getElementById("count"),
  issuedBtn = document.getElementById("issuedBooksBtn"),
  tbody = document.querySelector("tbody"),
  errorMsg = document.querySelector("small");

let dynmaicId = 1;
let userDetails = JSON.parse(localStorage.getItem("UserDetails"));
let userStorage = userDetails;
let bookDetails = JSON.parse(localStorage.getItem("bookDetails"));
let bookStorage = bookDetails;

function init() {
  let issuedBooksLsit = getIssuedBookStorage();
  listingIssuedBookInTable(issuedBooksLsit);
}
init();
selectionUserArea();
selectionBookArea();
listingIssuedBookInTable();

// Listing datas in dropdowns For UserAREA

function selectionUserArea() {
  let userHtml = "";
  let userDiv = document.getElementById("userDiv");
  userStorage.forEach((user) => {
    userHtml += ` <a class="dropdown-item" href="#"onclick="optionUserValue(event)" >${user.userName}</a> `;
  });
  userDiv.innerHTML = userHtml;
}

// Listing datas in dropdowns For bookAREA

function selectionBookArea() {
  let bookHtml = "";
  let bookDiv = document.getElementById("booksDiv");
  bookStorage.forEach((book) => {
    bookHtml += `
    <a class="dropdown-item" href="#"onclick="optionBooksValue(event)">${book.bookName}</a>`;
  });
  bookDiv.innerHTML = bookHtml;
}

//  For Changing the Values in DropDown Front

function optionUserValue(event) {
  userSelection.innerHTML = event.target.innerHTML;
}
function optionBooksValue(event) {
  bookSelection.innerHTML = event.target.innerHTML;
}

// VALIDATING TH BOOKS AND UPDATING THE RECIEVD BOOKS IN BOOKS PAGE TOO

function validatingTheQuantity(event) {
  event.preventDefault();

  let enteredQuantity = parseInt(inputCount.value),
    selectingUser = userSelection.innerHTML,
    selectingBook = bookSelection.innerHTML,
    booksInStock = bookStorage; // GETTING FROM BOOKS LOCAL STORAGE
  findingBookAndQuantity = booksInStock.find((bookInfo) => {
    return bookInfo.bookName == selectingBook;
  });

  let quantityInStock = parseInt(findingBookAndQuantity.quantity);
  console.log(quantityInStock);

  if (enteredQuantity <= quantityInStock) {
    let obj = {
      id: dynmaicId++,
      user: selectingUser,
      book: selectingBook,
      quantity: enteredQuantity,
    };

    let issuedBookDetails = getIssuedBookStorage();
    issuedBookDetails.push(obj);

    let calculateTheCount = quantityInStock - enteredQuantity,
      updatingTheCount = calculateTheCount.toString(),
      finalUpdateInBookStorage = booksInStock.map((book) => {
        if (selectingBook == book.bookName) {
          book.quantity = updatingTheCount;
          book.issuedBooks = parseInt(book.issuedBooks) + parseInt(enteredQuantity);
        }
        return book;
      });

    localStorage.setItem('bookDetails', JSON.stringify(finalUpdateInBookStorage));
    addInLocalStorage(issuedBookDetails);
    // updatingeBookStorageQuantity(issuedBookDetails);
    showSuccess(selectingBook);
    listingIssuedBookInTable();
    clearUserField();
  } else {
    showError(enteredQuantity);
  }
};

// LISTING THE ISSUED BOOKS IN TABLE 

function listingIssuedBookInTable() {

  let issuedBooks = getIssuedBookStorage();
  issuedBookRender = document.createElement('tr'),
    issuedBookRender = '';
  var groupedUser = groupArrayOfObjects(issuedBooks, "user");
  Object.keys(groupedUser).map((key, i) => {
    return (issuedBookRender += `
<tr>
<th style= "color: white;">${i + 1}</th>
<td style= "color: white;">${key}</td>
<td> <ul style= "color: white;"> 
${Object.values(groupedUser[key]).map((s) => {
      return `<li>${s.book}_${s.quantity}</li>`;
    })}
</li>
</ul>
</td>
</tr>
`)
  });
  tbody.innerHTML = issuedBookRender;
}

// CLEARING THE USERFIELDS

function clearUserField() {
  inputCount.value = "";
}

// SHOWING ERROR MESSAGE

function showError(quantity) {
  errorMsg.innerText = `sorry ! Your quantity is ${quantity} is not available in our book Stocks`;
  errorMsg.style.color ="red";
  clearUserField();
}

// SHOWING SUCESS

function showSuccess(book) {
  errorMsg.innerText = `Your  book ${book} as been added Succesfully `
  errorMsg.style.color = "green"
}

// EVENT LISENTENERS

issuedBtn.addEventListener("click", (event) => {
  event.preventDefault();

  if (inputCount.value == "") {
    alert("Kindly fill the Book Quantity in Input field");
  } else {
    validatingTheQuantity(event);
  }
});

//  CREATING THE LOCAL STORAGE

function addInLocalStorage(issuedBookDetails) {
  localStorage.setItem("IssuedBooks", JSON.stringify(issuedBookDetails));
}

// GETTING DATA FROM LOCAL STORAGE

function getIssuedBookStorage() {
  if (localStorage.getItem("IssuedBooks")) {
    let issuedBooksLsit = localStorage.getItem("IssuedBooks");
    return JSON.parse(issuedBooksLsit);
  } else {
    localStorage.setItem("IssuedBooks", "[]");
    let issuedBooksList = localStorage.getItem("IssuedBooks");
    return JSON.parse(issuedBooksList);
  }
}

// GROUPING THE ARRAY 

function groupArrayOfObjects(list, key) {
  return list.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}


/*Using Object.values()
Any JavaScript object can be converted to an array using Object.values():
Returns enumerable properties as an array
Object.keys(object)*/
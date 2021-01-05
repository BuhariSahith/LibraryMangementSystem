const userSelection = document.getElementById("usersDropdown"),
  bookSelection = document.getElementById("booksDropdown"),
  inputCountArea = document.getElementById("input"),
  issuedBtn = document.getElementById("issuedBookBtn"),
  tbody = document.querySelector('tbody');


let userDetails = JSON.parse(localStorage.getItem('UserDetails'));
let userStorage = userDetails;
let bookDetails = JSON.parse(localStorage.getItem('bookDetails'));
let bookStorage = bookDetails;


// var e = document.getElementById("ddlViewBy");
// var strUser = e.options[e.selectedIndex].text;

function optionValue(event) {

  userSelection = event.currentTarget.value;
  userSelection.selectedIndex.value = "2"
  

}
// Listing datas in dropdowns For UserAREA

function selectionUserArea(e) {
  e.preventDefault();

  userSelection.innerHTML = '';
  userStorage.forEach((item) => {
    let userDropDown = document.createElement('option');
    userDropDown.setAttribute('value', item.userName)
     userDropDown.textContent = item.userName;
    userSelection.appendChild(userDropDown);
  });

};

// Listing datas in dropdowns For bookAREA  

function selectionBookArea(e) {
  e.preventDefault();

  bookSelection.innerHTML = '';
  bookStorage.forEach((item) => {
    let booksDropDown = document.createElement('option');
    booksDropDown.setAttribute('value', item.bookName);
   booksDropDown.textContent = item.bookName;
    bookSelection.appendChild(booksDropDown);
  });
};








// document.getElementById("userdropdown").innerHTML = event.target.innerHTML;
// function setSelectedValue(selectObj, valueToSet) {
//     for (var i = 0; i < selectObj.options.length; i++) {
//         if (selectObj.options[i].text== valueToSet) {
//             selectObj.options[i].selected = true;
//             return;
//         }
//     }
// }







// EVENT LISENTENERS 

bookSelection.addEventListener("click", selectionBookArea);
userSelection.addEventListener("click", selectionUserArea);
// issuedBtn.addEventListener('click', insertDataInRow)

function insertDataInRow() {
  const bookMapping = {

    ramesh: [{ bookName: "js_1" }, { bookName: "Java" }, { bookName: "Js" }],
    suresh: [{ bookName: "Node" }, { bookName: "Firebase" }, { bookName: "React" }],
    gopi: [{ bookName: "MangoDb" }, { bookName: "PHP" }, { bookName: "JSON" }],

  };

  for (let key in bookMapping) {
    const userName = key;
    count++;
    const tRow = document.createElement('tr');
    tRow.innerHTML = `<th>${count}</th>
      <td>${userName}</td>
      `;
    bookMapping[key].forEach((book) => {
      const tableData = document.createElement('td');
      tableData.innerHTML = `<ul>
        <li>${book.bookName}</li>
        </ul>
        `;
      tRow.innerHTML += tableData;
    })
    tbody.append(tRow);

  }
}

function selectionBookArea() {
  bookSelection.innerHTML = "";
  bookStorage.forEach((book) => {
    bookSelection.innerHTML += `
    <a class="dropdown-item" href="#"onclick="optionBooksValue(event)">${book.bookName}</a>
    `;
  });
}

function updatingeBookStorageQuantity(bookData) {

  let updateQuantity = quantityInStock  - enteredQuantity;
  updateQuantity.toString();
  let newValuesToBookStorage = bookData.map((book) => {
    if (selectingBook == book.bookName) {
      book.quantity = updateQuantity;
      //  = parseInt()+parseInt();
    }
    return book;
  });
  localStorage.setItem("bookDetails", JSON.stringify(newValuesToBookStorage));
}
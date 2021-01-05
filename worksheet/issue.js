loadBooks();
loadUsers();
addIssuedBook();

const userdropdown = document.getElementById("userdropdown");
const booksdropdown = document.getElementById("booksdropdown");
const count = document.getElementById("count");
const issuedbookbtn = document.getElementById("issuedbookbtn");
const errmsg = document.getElementById("issuedbookerrmsg");

function loadBooks() {
  let loadedBooks = localStorage.getItem("localbooks");
  if (loadedBooks == null) {
    bookList = [];
  } else {
    bookList = JSON.parse(loadedBooks);
  }
  let bookHtml = "";
  let bookdiv = document.getElementById("bookdiv");
  bookList.forEach((book) => {
    bookHtml += `<a class="dropdown-item book" id="linkBook" href="#" data-id="${book.quantity}" onclick="getBook(event)" >${book.bookname}</a>`;
  });

  bookdiv.innerHTML = bookHtml;
}

function loadUsers() {
  let loadedUsers = localStorage.getItem("localusers");
  if (loadedUsers == null) {
    userList = [];
  } else {
    userList = JSON.parse(loadedUsers);
  }
  let userHtml = "";
  let userdiv = document.getElementById("userdiv");
  userList.forEach((user) => {
    userHtml += `<a class="dropdown-item" href="#" onclick="getUser(event)" >${user.username}</a>`;
  });
  userdiv.innerHTML = userHtml;
}

function getUser(event) {
  document.getElementById("userdropdown").innerHTML = event.target.innerHTML;
}

function getBook(event) {
  document.getElementById("booksdropdown").innerHTML = event.target.innerHTML;

}

function addIssuedBook() {
  let webLocalissuedBooks = localStorage.getItem("localissuedbooks");
  if (webLocalissuedBooks == null) {
    issuedBooks = [];
  } else {
    issuedBooks = JSON.parse(webLocalissuedBooks);
  }
  let issuedBookHtml = "";
  let issuedBookList = document.getElementById("issuedbooklist");
  var groupedUser = groupArrayOfObjects(issuedBooks, "username");

  Object.keys(groupedUser).map(function (key, i) {
    return (issuedBookHtml += `<tr>
            <th scope="row">${i + 1}</th>
            <td>${key}</td>
             <td> <ul id="ul"> 
             ${Object.values(groupedUser[key]).map(function (s) {
      return `<li>${s.book}_${s.count}</li>`;
    })}
</li>
</ul>
</td>
</tr>`);
  });
  issuedBookList.innerHTML = issuedBookHtml;
}
//  LISTING THE ISSUED BOOKS DETAILS IN TABLE AFTER VALIDATION GET OVER

function listingIssuedBookInTable(data) {
  tbody.innerHTML = "";
  data.forEach((value) => {
    let tRow = document.createElement("tr");
    tRow.innerHTML = `
  <td>${value.id}</td>
  <td>${value.user}</td>
  <td>${value.book}</td>
  <td>${value.quantity}</td>
 `;
    tbody.appendChild(tRow);
  });
}
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


issuedbookbtn.addEventListener("click", (e) => {
  errmsg.innerHTML = "";
  let enteredQty = parseInt(count.value);
  let selectedBook = document.getElementById("booksdropdown").innerHTML;
  console.log(selectedBook);


  let x = JSON.parse(localStorage.getItem("localbooks"));
  let ele = x.find((book) => {
    return book.bookname == selectedBook;
  });
  let availableQty = parseInt(ele.quantity);
  console.log(ele.quantity);

  if (enteredQty <= availableQty) {
    e.preventDefault();

    //local storage
    issuedBookObj = {
      username: userdropdown.innerHTML,
      book: booksdropdown.innerHTML,
      count: count.value,
    };

    let webLocalissuedBooks = localStorage.getItem("localissuedbooks");
    if (webLocalissuedBooks == null) {
      issuedBooks = [];
    } else {
      issuedBooks = JSON.parse(webLocalissuedBooks);
    }
    issuedBooks.push(issuedBookObj);

    let updateQuantity = availableQty - enteredQty;
    let quantityUpdated = updateQuantity.toString();

    let output = x.map(function (book) {
      if (selectedBook == book.bookname) {
        
        book.quantity = quantityUpdated;

        book.issuedbooks= parseInt(book.issuedbooks)+parseInt( enteredQty); // doubt 
      }
      return book;
    });

    console.log(output);

    localStorage.setItem("localbooks", JSON.stringify(output));

    //let table = document.getElementById("userlist");
    //let html = "";
    localStorage.setItem("localissuedbooks", JSON.stringify(issuedBooks));

    addIssuedBook();
  } else {
    errmsg.innerHTML =
      "Entered quantity is " +  quantityInStock
      count.value +
      " but only " +
      availableQty +
      " is available";
  }
});

function groupArrayOfObjects(list, key) {
  return list.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}



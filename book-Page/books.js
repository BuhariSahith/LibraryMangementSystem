const form = document.querySelector('form'),
 isbnNum = document.querySelector('#isbnNumber'),
 bookName = document.querySelector('#bookName'),
 authorName = document.querySelector('#author'),
 publisher = document.querySelector('#publisher'),
 quantity = document.querySelector('#quantity'),
 submitbtn = document.getElementById('submitbtn'),
 updatebtn = document.getElementById('updatebtn'),
 tableBody = document.querySelector('tbody');

 let bookDetails = [isbnNum , bookName ,authorName ,publisher ,quantity];
 let position,
 dynmaicId  =0;
//  let dynmaicId = Math.floor(Math.random() * 10);


 function init() {
    let bookList = getStorage();
    insertUserTable(bookList);
  }
  init();


// Attaching the Event Listeners 
submitbtn.addEventListener('click',addBooksInfo)

// Adding User Input Info
function addBooksInfo(event) {
    event.preventDefault();
    let bookInfo = {

        bookId:dynmaicId++,
        isbnNumber: isbnNum.value,
        bookName:bookName.value,
        authorName:authorName.value,
        publisher:publisher.value,
        quantity:quantity.value,
        issuedBooks: 0,
    };
    if (bookInfo.bookId&&
        bookInfo.isbnNumber &&
        bookInfo.bookName &&
        bookInfo.authorName &&
        bookInfo.publisher &&
        bookInfo.quantity) {
            let bookList = getStorage();
            bookList.push(bookInfo);
            addInLocalStorage(bookList);
            insertUserTable(bookList);
            clearUserField();
    }else {
        // alert("Kindly Fill all the Fields !")
        validation(bookDetails)
    }
};

// Inserting User Input in Table 

function insertUserTable(data) {
    tableBody.innerHTML='';
    data.forEach((value) =>{
        let tableRow = document.createElement('tr');
        tableRow.innerHTML =`
        <td>${value.bookId}</td>
        <td>${value.isbnNumber}</td>
        <td>${value.bookName}</td>
        <td>${value.authorName}</td>
        <td>${value.publisher}</td>
        <td>${value.quantity}</td>
        <td>${value.issuedBooks}</td>
        <td><button type="submit" class="editbtn" id="editbtn" ><span class="fas fa-user-edit"></span></button></td>
        <td><button type="submit" class="deletebtn" id="deletebtn"><span class="fas fa-trash-alt"></span></button></td>
        `
        tableBody.appendChild(tableRow);
    });
}

// Clearing the Uer Input Fields

function clearUserField() {
    isbnNum.value='';
    bookName.value='';
    authorName.value='';
    publisher.value='';
    quantity.value='';
   
};

tableBody.addEventListener('click',processEditDeleteBtn)

function processEditDeleteBtn(event) {
    if(event.target.id == 'editbtn') {
        let bookId =  event.target.parentElement.parentElement.cells.item(0).innerText;
        editUserInput(bookId);
    }else if(event.target.id == 'deletebtn') {
        let bookId = event.target.parentElement.parentElement.cells.item(0).innerText;
        deleteUserInput(bookId);
        event.target.parentElement.parentElement.remove();
    }
};

// Editing the User Input 

function editUserInput(data) {
    let bookDetails = getStorage();
    bookDetails.forEach((book, index)=> {
        if (book.bookId == data) {  
        isbnNum.value = book.isbnNumber;    
        bookName.value = book.bookName;
        authorName.value = book.authorName;
        publisher.value = book.publisher;
        quantity.value = book.quantity;
        updatebtn.style.display = "block";
        submitbtn.style.display = "none";
        position = index;
        }
    })
};

updatebtn.addEventListener('click',updateEditedUserInfo);

function updateEditedUserInfo() {

    let userInfo = {

        bookId:dynmaicId,
        isbnNumber:isbnNum.value,
        bookName:bookName.value,
        authorName:authorName.value,
        publisher:publisher.value,
        quantity:quantity.value,
        issuedBooks: 0,

    };

    let bookDetails = getStorage();
    bookDetails.splice(position,1,userInfo);
    addInLocalStorage(bookDetails);
    insertUserTable(bookDetails);
    clearUserField();
    alert("Updated Successfuly");
    updatebtn.style.display ="none";
    submitbtn.style.display = "block";
};

// Deleting the Users  

function deleteUserInput (data) {
    let bookDetails = getStorage();
    bookDetails.forEach((book ,index) => {
        if(book.bookId == data) {
            bookDetails.splice(index , 1);
        }
    })
    addInLocalStorage(bookDetails);
    alert("Will Be Erased !")
}


// Creating and Adding Local Storage 

function addInLocalStorage(bookDetails) {
    localStorage.setItem("bookDetails",JSON.stringify(bookDetails));
    
};

function getStorage() {
    if (localStorage.getItem('bookDetails')) {
        let bookList = localStorage.getItem('bookDetails')
        return JSON.parse(bookList);
    }else {
        localStorage.setItem('bookDetails',"[]");
        let bookList = localStorage.getItem('bookDetails');
        return JSON.parse(bookList);
    }
}

// VALIDATIONS PART 

function validation(bookDetails) {
    bookDetails.forEach(( input ) => {
      if (input.value.trim() == '') {
        showError(input, `${gettingFeildName(input)} is Required`)
      }else {
        showSuccess(input , `${gettingFeildName(input)} Done!`)
      }
    });
  }
  function gettingFeildName(input) {
    return input.id.charAt().toUpperCase() + input.id.slice(1)
    // Returns the character at the specified index.
    // Converts all the alphabetic characters in a string to uppercase.
  }
  function showError (input,msg) {
    const formdivs = input.parentElement;
    formdivs.className = 'formdivs error';
    const small = formdivs.querySelector('small');
    small.innerText = msg;
  }
  function showSuccess(input , msg) {
    const formdivs = input.parentElement;
    formdivs.className = "formdivs success";
    const small = formdivs.querySelector('small');
    small.innerText = msg;
  
  }
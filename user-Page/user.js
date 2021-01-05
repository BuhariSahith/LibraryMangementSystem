const form = document.querySelector("form"),
  userName = document.getElementById("username"),
  email = document.getElementById("email"),
  address = document.getElementById("address"),
  city = document.getElementById("city"),
  contactNumber = document.getElementById("contactNumber"),
  submitBtn = document.getElementById("submitbtn"),
  updateBtn = document.getElementById("updatebtn"),
  tableBody = document.querySelector("tbody"),
  small = document.querySelectorAll('small')
let position;
let formdetails = [userName ,email ,address ,city, contactNumber];
//  let dynmaicId = Math.floor(Math.random() * 10);
let dynmaicId = 0;

/*
A particular init() function may be used to initialise the whole webpage, 
in which case it would probably be called from document.ready or onload processing, 
or it may be to initialise a particular type of object, or...well, you name it.
*/

function init() {
  let userList = getStorage();
  insertUserTable(userList);
}
init();

// Attaching the Event Listeners
submitBtn.addEventListener("click", addUserInfo);

// Adding User Input Info
function addUserInfo(event) {
  event.preventDefault();
  let userInfo = {
    userId: dynmaicId++,
    userName: userName.value,
    email: email.value,
    address: address.value,
    city: city.value,
    contactNumber: contactNumber.value,
  };
  if (
    userInfo.userId &&
    userInfo.userName &&
    userInfo.email &&
    userInfo.address &&
    userInfo.city &&
    userInfo.contactNumber
  ) {
    let userList = getStorage();
    userList.push(userInfo);
    addInLocalStorage(userList);
    insertUserTable(userList);
    clearUserField();

  } else {
    validation(formdetails); 
  }
}
// Inserting User Input in Table

function insertUserTable(data) {
  tableBody.innerHTML = "";
  data.forEach((value) => {
    let tableRow = document.createElement("tr");
    tableRow.innerHTML = `
        <td>${value.userId}</td>
        <td>${value.userName}</td>
        <td>${value.email}</td>
        <td>${value.address}</td>
        <td>${value.city}</td>
        <td>${value.contactNumber}</td>
        <td><button type="submit" class="editbtn" id="editbtn" ><span class="fas fa-user-edit"></span></button></td>
        <td><button type="submit" class="deletebtn" id="deletebtn"><span class="fas fa-trash-alt"></span></button></td>
        `;
    tableBody.appendChild(tableRow);
  });
}

// Clearing the Uer Input Fields

function clearUserField() {
  userName.value = "";
  email.value = "";
  address.value = "";
  city.value = "";
  contactNumber.value = "";
  
}

tableBody.addEventListener("click", processEditDeleteBtn);

function processEditDeleteBtn(event) {
  if (event.target.id == "editbtn") {
    let userId = event.target.parentElement.parentElement.cells.item(0)
      .innerText;
    editUserInput(userId);
  } else if (event.target.id == "deletebtn") {
    let userId = event.target.parentElement.parentElement.cells.item(0)
      .innerText;
    deleteUserInput(userId);
    event.target.parentElement.parentElement.remove();
  }
}

// Editing the User Input

function editUserInput(data) {
  let userDetails = getStorage();
  userDetails.forEach((user, index) => {
    if (user.userId == data) {
      userName.value = user.userName;
      email.value = user.email;
      address.value = user.address;
      city.value = user.city;
      contactNumber.value = user.contactNumber;
      updateBtn.style.display = "block";
      submitBtn.style.display = "none";
      position = index;
    }
  });
}

function deleteUserInput(data) {
  let userDetails = getStorage();
  userDetails.forEach((user, index) => {
    if (user.userId == data) {
      userDetails.splice(index, 1);
    }
  });
  addInLocalStorage(userDetails);
  alert("Will Be Erased !");
}

updateBtn.addEventListener("click", updateEditedUserInfo);

function updateEditedUserInfo() {
  let obj = {
    userId: dynmaicId,
    userName: userName.value,
    email: email.value,
    address: address.value,
    city: city.value,
    contactNumber: contactNumber.value,
  };

  let userDetails = getStorage();
  userDetails.splice(position, 1, obj);
  addInLocalStorage(userDetails);
  insertUserTable(userDetails);
  clearUserField();
  alert("Updated Successfuly");
  updateBtn.style.display = "none";
  submitBtn.style.display = "block";
}


// LOCAL STORAGE
// Creating  Local Storage

function addInLocalStorage(userDetails) {
  localStorage.setItem("UserDetails", JSON.stringify(userDetails));
}

// Adding to Local Storage

function getStorage() {
  if (localStorage.getItem("UserDetails")) {
    let userList = localStorage.getItem("UserDetails");
    return JSON.parse(userList);
  } else {
    localStorage.setItem("UserDetails", "[]");
    let userList = localStorage.getItem("UserDetails");
    return JSON.parse(userList);
  }
}



// VALIDATIONS PART 

function validation(formdetails) {
  formdetails.forEach(( input ) => {
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




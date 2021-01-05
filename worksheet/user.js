addUsers();

let form = document.getElementById("form");
let username = document.getElementById("username");
let email = document.getElementById("email");
let address = document.getElementById("address");
let city = document.getElementById("city");
let contactno = document.getElementById("contactno");
let adduserbtn = document.getElementById("adduserbtn");
let saveuserbtn = document.getElementById("saveuserbtn");
let exampleModal=document.getElementById('exampleModal');
let deleteModalBtn= document.getElementById('deleteModalId');

// Example starter JavaScript for disabling form submissions if there are invalid fields

adduserbtn.addEventListener("click", (event) => {
  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  }
  form.classList.add("was-validated");

  //local storage
  if (
    (username.value.trim() &&
      email.value.trim() &&
      address.value.trim() &&
      city.value.trim() &&
      contactno.value.trim()) != 0
  ) {
    userObj = {
      id: 0,
      username: username.value,
      email: email.value,
      address: address.value,
      city: city.value,
      contactno: contactno.value,
    };
    let webuser = localStorage.getItem("localusers");
    if (webuser == null) {
      users = [];
    } else {
      users = JSON.parse(webuser);
    }
    users.push(userObj);
    username.value = "";
    email.value = "";
    address.value = "";
    city.value = "";
    contactno.value = "";
  }
  //let table = document.getElementById("userlist");
  //let html = "";
  localStorage.setItem("localusers", JSON.stringify(users));

  console.log(users);
  addUsers();
});

function addUsers() {
  let webuser = localStorage.getItem("localusers");
  if (webuser == null) {
    users = [];
  } else {
    users = JSON.parse(webuser);
  }
  //get the table body

  let userHtml = "";
  let userlist = document.getElementById("userlist");
  users.forEach((user, i) => {
    let userId=i+1
    userHtml += `<tr>
<th scope="row">${userId}</th>
<td>${user.username}</td>
<td>${user.email}</td>
<td>${user.address}</td>
<td>${user.city}</td>
<td>${user.contactno}</td>
<td colspan="2">
<button type="button" class="btn btn-primary" onclick="editUserInfo(${i})">
Edit
</button>
<button type="button" class="btn btn-danger" onclick="onOpenModal(${i})"  >
Delete
</button>
</td>
</tr>`;
  });

  userlist.innerHTML = userHtml;
}

//edit user details
function editUserInfo(index) {
  saveindex.value = index;
  let webuser = localStorage.getItem("localusers");
  let users = JSON.parse(webuser);

  //id.value = array[index].key/propertyname
  username.value = users[index].username;
  email.value = users[index].email;
  address.value = users[index].address;
  city.value = users[index].city;
  contactno.value = users[index].contactno;
  adduserbtn.style.display = "none";
  saveuserbtn.style.display = "block";
}

//save user info

saveuserbtn.addEventListener("click", (e) => {
  e.preventDefault();
  let webuser = localStorage.getItem("localusers");
  let users = JSON.parse(webuser);
  let saveindex = document.getElementById("saveindex").value;
  users[saveindex].username = username.value;
  users[saveindex].email = email.value;
  users[saveindex].address = address.value;
  users[saveindex].city = city.value;
  users[saveindex].contactno = contactno.value;
 
  localStorage.setItem("localusers", JSON.stringify(users));
  adduserbtn.style.display = "block";
  saveuserbtn.style.display = "none";
  username.value = "";
  email.value = "";
  address.value = "";
  city.value = "";
  contactno.value = "";


  addUsers();
});
 
function onOpenModal(index){
  exampleModal.style.display='block';
  deleteModalBtn.setAttribute('data-deleteId',index)
  
}

function deleteUserInfo(event) {
  exampleModal.style.display='none';
  var tableRow=event.target.getAttribute("data-deleteId");
  let webuser = localStorage.getItem("localusers");
  let users = JSON.parse(webuser);
  users.splice(tableRow, 1);
  localStorage.setItem("localusers", JSON.stringify(users));
  username.value = "";
  email.value = "";
  address.value = "";
  city.value = "";
  contactno.value = "";
  addUsers();
}
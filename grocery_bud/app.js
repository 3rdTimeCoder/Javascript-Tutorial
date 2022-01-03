// ************* SELECT ITEMS ************
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// edit option
let editElement;
let editFlag = false;
let editID = "";

// ************ EVENT LISTENERS ***************
// submit form
form.addEventListener("submit", addItem);

// clear items
clearBtn.addEventListener("click", clearItems);

// load items
window.addEventListener("DOMContentLoaded", setupItems);

// ************ FUNCTIONS ***************
function addItem(e) {
  e.preventDefault(); //prevents form default of wanting to submit form to surver.
  //   console.log(grocery.value); //retuns everything you type in form input

  const value = grocery.value;
  const id = new Date().getTime().toString();
  //   console.log(id);

  if (value && !editFlag) {
    //editFlag === false
    createListItem(id, value);

    // display alert
    displayAlert("item added to the list", "success");

    // show container
    container.classList.add("show-container");

    // add to local storage
    addToLocalStorage(id, value);

    // set back to default
    setBackToDefault();

    //
  } else if (value && editFlag) {
    //editFlag === true
    // console.log("editing");
    editElement.innerHTML = value; //whatever is in the input field when pressing edit

    // display alert
    displayAlert("item changed!", "success");

    // add to local storage
    addToLocalStorage(id, value);

    // edit the item in local storage
    editLocalStorage(editID, value);

    // set back to default
    setBackToDefault();

    //
  } else {
    // console.log("empty value");
    displayAlert("please enter value", "danger");
  }
}

// display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  // remove alert
  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000); //1000ms = 1s
}

// clear Items
function clearItems() {
  const items = document.querySelectorAll(".grocery-item");

  //   remove items
  if (items.length > 0) {
    items.forEach((item) => {
      list.removeChild(item);
    });
  }

  // hide container
  container.classList.remove("show-container");

  //   display Alert
  displayAlert("emptied list!", "danger");

  //   set back to default
  setBackToDefault();

  //   remove item from local storage
  localStorage.removeItem("list");
}

// delete functon
function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement; //'.grocery-item'
  //   console.log(element);
  const id = element.dataset.id;
  list.removeChild(element);

  //   hide container if no items left in list
  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }

  //   display alert
  displayAlert("item removed", "danger");

  //   set back to default
  setBackToDefault();

  //   remove from local storage
  removeFromLocalStorage(id);
}

// edit function
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;

  //set edit item
  editElement = e.currentTarget.parentElement.previousElementSibling;
  //   console.log(editElement); //<p class="title">dragonfly poached eggs</p>

  //   set form value
  grocery.value = editElement.innerHTML;
  //   console.log(grocery.value);
  editFlag = true;
  editID = element.dataset.id;
  submitBtn.textContent = "edit";
}

// set back to default
function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
}

// ************ LOCAL STORAGE ***************
function addToLocalStorage(id, value) {
  const grocery = { id, value }; //same as { id: id, value: value }
  // console.log(grocery);
  let items = localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
  console.log(items);
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}

function removeFromLocalStorage(id) {
  let items = getLocalStorage();

  items = items.filter((item) => {
    if (item.id !== id) {
      return item;
    }
  });
  localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStorage(id, value) {
  let items = getLocalStorage();
  items = items.mp((item) => {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

// local storage API in devTools under Appliations
// localStorageMethods: setItem, getItem, removeItem
// remember: save as strings
// examples:
/* localStorage.setItem("orange", JSON.stringify(["item", "item2"]));
const oranges = JSON.parse(localStorage.getItem("orange"));
console.log(oranges);
localStorage.removeItem("orange");*/

// ************ SETUP ITEMS ***************
function setupItems() {
  let items = getLocalStorage();
  if (items.length > 0) {
    items.forEach((item) => {
      createListItem(item.id, item.value);
    });
    container.classList.add("show-container");
  }
}

// create/display list/grocery items
function createListItem(id, value) {
  const element = document.createElement("article");
  // addclass
  element.classList.add("grocery-item");
  // add id
  const attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>`;

  // append child
  list.appendChild(element);

  // delete and edit buttons functionality
  // delete
  const deleteBtn = element.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteItem);
  // edit
  const editBtn = element.querySelector(".edit-btn");
  editBtn.addEventListener("click", editItem);
}

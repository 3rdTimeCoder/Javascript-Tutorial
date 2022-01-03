// NAVBAR
const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");

navToggle.addEventListener("click", () => {
  links.classList.toggle("show-links");
});
// =================================================================================================================================================

// GROCERY BUD
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

  //   set form value
  grocery.value = editElement.innerHTML;
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
// =================================================================================================================================================

// SLIDER
const slideContainer = document.querySelector(".slide-container");

//   Event listeners
const startSlider = (type) => {
  const active = document.querySelector(".active");
  let last = document.querySelector(".last");
  let next = active.nextElementSibling;

  if (!next) {
    //if no more next, go back to start
    next = slideContainer.firstElementChild;
  }

  //   remove current classes
  active.classList.remove(["active"]);
  last.classList.remove(["last"]);
  next.classList.remove(["next"]);

  // add classes
  active.classList.add("last");
  last.classList.add("next");
  next.classList.add("active");
};
// start slider
const oneMin = 6000;
window.addEventListener("DOMContentLoaded", () => {
  setInterval(startSlider, oneMin);
});

// =================================================================================================================================================

// COLOR FLIPPER
//hex colors have 6 digits, the first digit is a "#" and the rest can be anything from 0-9 and A-F.
const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const colorsLen = hex.length;
const color_flipper_btn = document.querySelector(".btn-hero");
const color = document.querySelector(".color");
const color_flipper_container = document.getElementById("bg-color");
const color_flipper = document.getElementById("color_flipper");

color_flipper_btn.addEventListener("click", () => {
  //create hex color.
  let hexColor = "#";
  for (let i = 0; i < 6; i++) {
    randomNum = Math.floor(Math.random() * colorsLen);
    hexColor += hex[randomNum];
  }
  // make changes.
  color_flipper.style.backgroundColor = hexColor;
  color.textContent = hexColor;
  color.style.color = "white";
  color_flipper_btn.style.backgroundColor = hexColor;
  color_flipper_btn.style.color = "white";
  color_flipper_container.style.backgroundColor = hexColor;
  color_flipper_container.style.color = "white";
});

function getRandomNumber() {
  return Math.random();
}

// =================================================================================================================================================

// MODAL PROJECT
modalBtn = document.querySelector(".modal-btn");
modal_closeBtn = document.querySelector(".modal_close-btn");
modalOverlay = document.querySelector(".modal-overlay");

modalBtn.addEventListener("click", () => {
  modalOverlay.classList.toggle("open-modal");
});

modal_closeBtn.addEventListener("click", () => {
  modalOverlay.classList.toggle("open-modal");
});

// =================================================================================================================================================

// TABS PROJECT
const tabs_btns = document.querySelectorAll(".tab-btn");
const tabs_about = document.querySelector(".about");
const tabs_articles = document.querySelectorAll(".content");

tabs_about.addEventListener("click", (e) => {
  // currentTarget is what you added your event listner to.
  // target is the exact element you clicked on.
  const id = e.target.dataset.id;
  if (id) {
    //remove class '.active' from all button
    tabs_btns.forEach((tabs_btn) => {
      tabs_btn.classList.remove("active");
      e.target.classList.add("active");
    });
    tabs_articles.forEach((article) => {
      article.classList.remove("active");
    });
    const element = document.getElementById(id);
    element.classList.add("active");
  }
});

// =================================================================================================================================================

// QUESTIONS PROJECT
// using selectors inside the element
const questions = document.querySelectorAll(".question");

questions.forEach((question) => {
  const question_btn = question.querySelector(".question-btn");
  question_btn.addEventListener("click", () => {
    //open one question, close the other questions
    questions.forEach((item) => {
      //if the item is not an ancestor of the button i clicked on, close it.
      if (item !== question) {
        item.classList.remove("show-text");
      }
    });

    question.classList.toggle("show-text");
  });
});

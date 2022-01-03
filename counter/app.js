//set initial count
let counter = 0;

//selet value and buttons
const value = document.getElementById("value");
const btns = document.querySelectorAll(".btn"); //returns nodeList with all the buttons.
// console.log(btns);

btns.forEach((item) => {
  item.addEventListener("click", () => {
    changeValue(item);
    changeColor();
    value.innerHTML = counter;
  });
});

function changeValue(btn) {
  if (btn.classList[1] === "reset") {
    counter = 0;
    value.style.color = "var(--clr-black)";
  } else if (btn.classList[1] === "decrease") {
    counter--;
  } else if (btn.classList[1] === "increase") {
    counter++;
  }
}

function changeColor() {
  if (counter < 0) {
    value.style.color = "red";
  } else if (counter > 0) {
    value.style.color = "green";
  }
}

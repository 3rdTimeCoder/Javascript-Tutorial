const colors = ["green", "red", "rgba(133,122,200)", "#f15025"];
colorsLen = colors.length;
const btn = document.getElementById("btn");
const color = document.querySelector(".color");
const container = document.getElementById("bg-color");

btn.addEventListener("click", () => {
  //get random number between 0 and 3;
  const randomNumber = Math.floor(getRandomNumber() * colorsLen);
  document.body.style.backgroundColor = colors[randomNumber];
  color.textContent = colors[randomNumber];
  btn.style.backgroundColor = colors[randomNumber];
  container.style.backgroundColor = colors[randomNumber];
});

function getRandomNumber() {
  return Math.random();
}

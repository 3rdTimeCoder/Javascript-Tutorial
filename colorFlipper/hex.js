const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const hexLen = hex.length;
const btn = document.getElementById("btn");
const color = document.querySelector(".color");
const container = document.getElementById("bg-color");

btn.addEventListener("click", () => {
  //hex colors have 6 digits, the first digit is a "#" and the rest can be anything from 0-9 and A-F.
  let hexColor = "#";
  //   console.log(randomNum);
  for (let i = 0; i < 6; i++) {
    randomNum = Math.floor(Math.random() * hexLen);
    hexColor += hex[randomNum];
  }
  // console.log(hexColor);
  document.body.style.backgroundColor = hexColor;
  btn.style.backgroundColor = hexColor;
  color.textContent = hexColor;
  container.style.backgroundColor = hexColor;
});

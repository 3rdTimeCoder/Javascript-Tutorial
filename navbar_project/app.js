// classList - shows/gets all classes
// contains - checks classList for specific class
// remove - remove class
// add - adds class
// toggle -  toggles class

// navbar
const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");
console.log("testing...");

navToggle.addEventListener("click", () => {
  //   console.log(links.classList);
  //   console.log(links.classList.contains("links"));
  //   if (links.classList.contains("show-links")) {
  //     links.classList.remove("show-links");
  //   } else {
  //     links.classList.add("show-links");
  //   }
  // JS provides a toggle class that removes the need for above if-chain. Same functionality.
  links.classList.toggle("show-links");
});

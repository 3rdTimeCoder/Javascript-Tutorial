// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read-only window property that returns the number of pixels the document has been scrolled vertically.
//slice extracts a section of a string without modifying the original string.
// offsetTop - A Number, representing the top position of the element, in pixels.

// ===================== set date dynamically=======================
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

// ===================== close links =======================
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener("click", () => {
  //   linksContainer.classList.toggle("show-links");
  //   dynamic set up for toggle links
  const containerHeight = linksContainer.getBoundingClientRect().height;
  //   console.log(containerHeight);
  const linksHeight = links.getBoundingClientRect().height; //get the height propperty
  //   console.log(linksHeight);
  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    linksContainer.style.height = 0;
  }
});

// ===================== fixed navbar =======================
const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");
window.addEventListener("scroll", () => {
  //   console.log(window.pageYOffset);
  const scrollHeight = window.pageYOffset;
  const navHeight = navbar.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    navbar.classList.add("fixed-nav");
  } else {
    navbar.classList.remove("fixed-nav");
  }

  // show back to top butto/link after certain height is passed:
  if (scrollHeight > 500) {
    topLink.classList.add("show-topLink");
  } else {
    topLink.classList.remove("show-topLink");
  }
});

// ===================== smooth scroll =======================
// select links
const scrollLinks = document.querySelectorAll(".scroll-link");
// console.log(scrollLinks);
scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    //prevent default
    e.preventDefault();
    // navigate to specific spot:
    // console.log(e.currentTarget.getAttribute("href"));
    const id = e.currentTarget.getAttribute("href").slice(1);
    // console.log(id);
    const element = document.getElementById(id);
    // calculate the heights
    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains("fixed-nav");
    let position = element.offsetTop - navHeight;
    // console.log(position);

    if (!fixedNav) {
      //haven't scrolled passed the height of the nav
      position = position - navHeight; //subtract the navHeight from the position again.
    }
    // on smaller screens if I have already toggled my links open:
    if (navHeight > 82) {
      position = position + containerHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });
    // close the links (on smaller screenss)
    linksContainer.style.height = 0;
  });
});

import people from "./data.js";
// console.log(people);

const container = document.querySelector(".slide-container");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

// set slides
container.innerHTML = people
  .map((person, slideIndex) => {
    //   console.table(person);
    //   console.log(slideIndex);
    //   destructure the person object:
    const { img, name, job, text } = person;
    //   console.log(name);
    //   more logic later
    let position = "next";
    if (slideIndex === 0) {
      position = "active";
    }
    if (slideIndex === people.length - 1) {
      position = "last";
    }

    return `<article class="slide ${position}">
          <img src="${img}" class="img" alt="${name}" />
          <h4>${name}</h4>
          <p class="title">${job}</p>
          <p class="text">
            ${text}
          </p>
          <div class="quote-icon">
            <i class="fas fa-quote-right"></i>
          </div>
        </article>`;
  })
  .join(""); //makes it one giant sting thus removing the commas.

//   Event listeners
const startSlider = (type) => {
  const active = document.querySelector(".active");
  //   console.log(active);
  let last = document.querySelector(".last");
  let next = active.nextElementSibling;
  if (!next) {
    //if no more next, go back to start
    next = container.firstElementChild;
  }

  //   remove current classes
  active.classList.remove(["active"]);
  last.classList.remove(["last"]);
  next.classList.remove(["next"]);

  if (type == "prev") {
    last.classList.add("active");
    active.classList.add("next");
    next = last.previousElementSibling;
    if (!next) {
      next = container.lastElementChild;
    }

    next.classList.add("last");
    return;
  }

  active.classList.add("last");
  last.classList.add("next");
  next.classList.add("active");
};
nextBtn.addEventListener("click", () => {
  startSlider();
});
prevBtn.addEventListener("click", () => {
  startSlider("prev");
});

const btns = document.querySelectorAll(".tab-btn");
const about = document.querySelector(".about");
const articles = document.querySelectorAll(".content");

about.addEventListener("click", (e) => {
  // currentTarget is what you added your event listner to.
  // target is the exact element you clicked on.
  //   console.log(e.target);
  //   console.log(e.target.dataset.id);
  const id = e.target.dataset.id;
  if (id) {
    //remove class '.active' from all button
    btns.forEach((btn) => {
      btn.classList.remove("active");
      e.target.classList.add("active");
    });
    articles.forEach((article) => {
      article.classList.remove("active");
    });
    const element = document.getElementById(id);
    element.classList.add("active");
  }
});

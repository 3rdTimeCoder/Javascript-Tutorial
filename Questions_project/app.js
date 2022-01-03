// travesing the dom
// const btns = document.querySelectorAll(".question-btn");

// btns.forEach((btn) => {
//   btn.addEventListener("click", (e) => {
//e is the event object
// console.log(e.currentTarget); //returns the current target of the click event between the buttons.
//the parent of each button element in the dom is '.question-title' div and the parent of that div is the '.question'' article. which is the on we want to add the '.show-text' class to.
// console.log(e.currentTarget.parentElement.parentElement);
// const question = e.currentTarget.parentElement.parentElement;
// question.classList.toggle("show-text");
//   });
// });

// using selectors inside the element
const questions = document.querySelectorAll(".question");

questions.forEach((question) => {
  //   console.log(question);
  const btn = question.querySelector(".question-btn"); //i select my button so I can add my event listener to it instead of .question because the i don't want to be able to click anywhere on my .question article to be able to toggle the .show-text.
  btn.addEventListener("click", () => {
    //if i open one question, close the other questions
    questions.forEach((item) => {
      //if the item(.question article is not an ancestor of the button i clicked on, close it.(remove .show-text)
      if (item !== question) {
        item.classList.remove("show-text");
      }
    });

    question.classList.toggle("show-text");
  });
});

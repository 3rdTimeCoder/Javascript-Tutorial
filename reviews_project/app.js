//local reviews data
const reviews = [
  {
    id: 1,
    name: "Sifanele Hadebe",
    job: "FULL STACK DEVELOPER",
    img: "./images/img1.png",
    text:
      "As a Full stack developer, Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel, dicta explicabo. Accusantium, molestias asperiores natus veniam minimased! Repellendus corporis dolores delectus porro amet fuga placeat adipisci officiis asperiores dignissimos!",
  },
  {
    id: 2,
    name: "Nomah Hadebe",
    job: "SOFTWARE DESIGNER",
    img: "./images/img2.png",
    text:
      "As a software designer, Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel, dicta explicabo. Accusantium, molestias asperiores natus veniam minimased! Repellendus corporis dolores delectus porro amet fuga placeat adipisci officiis asperiores dignissimos!",
  },
  {
    id: 3,
    name: "Nomahlubi S. Hadebe",
    job: "hacking specialist",
    img: "./images/img3.png",
    text:
      "As a hacking specialist, Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel, dicta explicabo. Accusantium, molestias asperiores natus veniam minimased! Repellendus corporis dolores delectus porro amet fuga placeat adipisci officiis asperiores dignissimos!",
  },
  {
    id: 4,
    name: "Doobsie",
    job: "database manager",
    img: "./images/img4.png",
    text:
      "As a database manager, Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel, dicta explicabo. Accusantium, molestias asperiores natus veniam minimased! Repellendus corporis dolores delectus porro amet fuga placeat adipisci officiis asperiores dignissimos!",
  },
  {
    id: 5,
    name: "NSH",
    job: "data scientist",
    img: "./images/img1.png",
    text:
      "As a data scientist, Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel, dicta explicabo. Accusantium, molestias asperiores natus veniam minimased! Repellendus corporis dolores delectus porro amet fuga placeat adipisci officiis asperiores dignissimos!",
  },
];

//select items
const img = document.getElementById("person-img");
const author = document.getElementById("author");
const job = document.getElementById("job");
const info = document.getElementById("info");

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const randomBtn = document.querySelector(".random-btn");

//set starting point
currentItem = 0;

//load initial item
//'DOMContentLoaded' fires when the initial html page has finished loading.
window.addEventListener("DOMContentLoaded", () => {
  //   console.log("page loaded");
  showPerson(currentItem);
});

//show person based on item
function showPerson(person) {
  const item = reviews[currentItem];
  img.src = item.img;
  author.textContent = item.name;
  job.textContent = item.job;
  info.textContent = item.text;
}

//show next person
nextBtn.addEventListener("click", () => {
  currentItem++;
  if (currentItem >= reviews.length) {
    currentItem = 0;
  }
  showPerson(currentItem);
});
//show previous person
prevBtn.addEventListener("click", () => {
  currentItem--;
  if (currentItem < 0) {
    currentItem = reviews.length - 1;
  }
  console.log(currentItem);
  showPerson(currentItem);
});

//show random person
randomBtn.addEventListener("click", () => {
  prevItem = currentItem; //capture current review
  currentItem = Math.floor(Math.random() * reviews.length);
  //make show the randomly chosen item is not the current(prevItem) item before loading
  if (prevItem != currentItem) {
    showPerson(currentItem);
  } else {
    currentItem = Math.floor(Math.random() * reviews.length);
    showPerson(currentItem);
  }
});

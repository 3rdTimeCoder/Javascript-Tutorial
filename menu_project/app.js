// items
menu = [
  {
    id: 1,
    title: "buttermilk pancakes",
    category: "breakfast",
    price: `$15.99`,
    img: "./images/menu-item.jpeg",
    desc: `Lorem ipsum dolor sit, amet consectetur adipisicing odit! Harum laboriosam quisquam accusamus, sapiente non nesciunt.`,
  },
  {
    id: 2,
    title: "diner double",
    category: "lunch",
    price: `$13.99`,
    img: "./images/item-2.jpeg",
    desc: `Lorem ipsum dolor sit, amet consectetur adipisicing odit! Harum laboriosam quisquam accusamus, sapiente non nesciunt.`,
  },
  {
    id: 3,
    title: "godzilla milkshake",
    category: "shakes",
    price: `$6.99`,
    img: "./images/item-3.jpeg",
    desc: `Lorem ipsum dolor sit, amet consectetur adipisicing odit! Harum laboriosam quisquam accusamus, sapiente non nesciunt.`,
  },
  {
    id: 4,
    title: "country delight",
    category: "lunch",
    price: `$6.99`,
    img: "./images/item-4.jpeg",
    desc: `Lorem ipsum dolor sit, amet consectetur adipisicing odit! Harum laboriosam quisquam accusamus, sapiente non nesciunt.`,
  },
  {
    id: 5,
    title: "egg attack",
    category: "lunch",
    price: `$18.99`,
    img: "./images/item-5.jpeg",
    desc: `Lorem ipsum dolor sit, amet consectetur adipisicing odit! Harum laboriosam quisquam accusamus, sapiente non nesciunt.`,
  },
  {
    id: 6,
    title: "oreo dream",
    category: "shakes",
    price: `$16.99`,
    img: "./images/item-6.jpeg",
    desc: `Lorem ipsum dolor sit, amet consectetur adipisicing odit! Harum laboriosam quisquam accusamus, sapiente non nesciunt.`,
  },
  {
    id: 7,
    title: "bacon overflow",
    category: "breakfast",
    price: `$8.99`,
    img: "./images/item-7.jpeg",
    desc: `Lorem ipsum dolor sit, amet consectetur adipisicing odit! Harum laboriosam quisquam accusamus, sapiente non nesciunt.`,
  },
  {
    id: 8,
    title: "american classic",
    category: "lunch",
    price: `$12.99`,
    img: "./images/item-8.jpeg",
    desc: `Lorem ipsum dolor sit, amet consectetur adipisicing odit! Harum laboriosam quisquam accusamus, sapiente non nesciunt.`,
  },
  // {
  //   id: 9,
  //   title: "quarantine bbuddy",
  //   category: "shakes",
  //   price: `$16.99`,
  //   img: "./images/item-2.jpeg",
  //   desc: `Lorem ipsum dolor sit, amet consectetur adipisicing odit! Harum laboriosam quisquam accusamus, sapiente non nesciunt.`,
  // },
];

const sectionCenter = document.querySelector(".section-center");
btnContainer = document.querySelector(".btn-container");

// load items
window.addEventListener("DOMContentLoaded", () => {
  displayMenuItems(menu);

  // add catergory btns and give the functionality:
  categories = getCategories(menu); //1st get categories
  displayCategoryBtns(categories); //2nd display categories as buttons on dom
  const filterBtns = document.querySelectorAll(".filter-btn"); //3rd recently added category button elements from dom
  filter(filterBtns); // add the filtering functionality to them
});

getCategories = (someMenu) => {
  const categories = someMenu.reduce(
    (values, item) => {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ["all"]
  );
  return categories;
};

displayCategoryBtns = (menuCategories) => {
  const categoryBtns = menuCategories
    .map((category) => {
      return ` <button class="filter-btn" type="button" data-id=${category}>
          ${category}
        </button>`;
    })
    .join("");
  btnContainer.innerHTML = categoryBtns;
  // console.log(categoryBtns);
};

// filter items
filter = (Btns) => {
  Btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // console.log(e.currentTarget.dataset.id);
      const category = e.currentTarget.dataset.id;
      const menuCategory = menu.filter((menuItem) => {
        // console.log(menuItem.category);
        if (menuItem.category === category) {
          // console.log(menuItem);
          return menuItem;
        }
      });
      // console.log(menuCategory);
      if (category === "all") {
        displayMenuItems(menu);
      } else {
        displayMenuItems(menuCategory);
      }
    });
  });
};

function displayMenuItems(menuItems) {
  let displayMenu = menuItems.map((item) => {
    // console.log(item);
    return `<article class="menu-item">
          <img
            src=${item.img}
            class="photo"
            alt=${item.title}
          />
          <div class="item-info">
            <header>
              <h4>${item.title}</h4>
              <h4 class="price">${item.price}</h4>
            </header>
            <p class="item-text">
            ${item.desc}
            </p>
          </div>
        </article>`;
  });
  displayMenu = displayMenu.join(""); //make it all one giant string
  sectionCenter.innerHTML = displayMenu;
}

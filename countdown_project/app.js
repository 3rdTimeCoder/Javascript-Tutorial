const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4"); //gives me all the h4 elements under/associated with the '.deadline-format' class.
// console.log(items);

// Dyanamically add the giveaway textContent:
// let currentDate = new Date(); //gives us current date
// let futureDate = new Date(2021, 8, 19, 17, 30, 0);

// set up a date that always has my date 10 days ahead so my counter never expires:
let tempDate = new Date(); //going to give us the date today.
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();
const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0);

//year,month,day,hours,mins,secs,etc. Note month is 0-index based, 0 is Jan and 1 is feb and so on.
// console.log(futureDate);
const year = futureDate.getFullYear();
const month = months[futureDate.getMonth()];
// console.log(month);
const weekday = weekdays[futureDate.getDay()];
// console.log(weekday);
const hours = futureDate.getHours();
const mins = futureDate.getMinutes();
const date = futureDate.getDate();
giveaway.textContent = `giveaway ends on ${weekday}, ${date} ${month} ${year}. ${hours}:${mins}am.`;

// future time in milliseconds:
const futureTime = futureDate.getTime();
// console.log(futureTime);

getRemainingTime = () => {
  const today = new Date().getTime();
  //   console.log(currentDate);
  const t = futureTime - today;
  //   console.log(t);
  //   1s = 1000ms
  //   1m = 60s
  //   1hr = 60mins
  //   1day = 24hrs

  //   values in ms:
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMin = 60 * 1000;

  //   calculate all values:
  let days = Math.floor(t / oneDay);
  let hours = Math.floor((t % oneDay) / oneHour);
  let mins = Math.floor((t % oneHour) / oneMin);
  let seconds = Math.floor((t % oneMin) / 1000);

  //   set values array
  const values = [days, hours, mins, seconds];

  format = (item) => {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  };

  //   set innerHTML
  items.forEach((item, index) => {
    item.innerHTML = format(values[index]);
  });
  //   when currentTime > futureTime (i.e deadline has passed):
  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">Sorry, this giveaway has expired<h4>`;
  }
};

let countdown = setInterval(getRemainingTime, 1000); //1000ms = 1s
getRemainingTime();

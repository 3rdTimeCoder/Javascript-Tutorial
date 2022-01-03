modalBtn = document.querySelector(".modal-btn");
closeBtn = document.querySelector(".close-btn");
modalOverlay = document.querySelector(".modal-overlay");

modalBtn.addEventListener("click", () => {
  modalOverlay.classList.toggle("open-modal");
});

closeBtn.addEventListener("click", () => {
  modalOverlay.classList.toggle("open-modal");
});

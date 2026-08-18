const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListner("click", () => {
  navMenu.classList.toggle("active");
});



document.addEventListener("DOMContentLoaded", () => {
  console.log("FitNova website loaded!");
});

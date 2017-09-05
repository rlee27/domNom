const Router = require("./router.js");


document.addEventListener("DOMContentLoaded", () => {
  clickHandler();
  const router = new Router(document.querySelector('.content'));
  router.start();
});


const clickHandler = () => {
  Array.from(document.querySelectorAll(".sidebar-nav li")).forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.hash = e.currentTarget.innerText.toLowerCase();
    });
  });
};

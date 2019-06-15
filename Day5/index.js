window.onload = function() {
  let panels = document.querySelector(".panels");
  function toggleOpen(e) {
    e.target.closest(".panel").classList.toggle("open");
  }
  function toggleActive(e) {
    if(e.propertyName.includes("flex")) {
      e.target.closest(".panel").classList.toggle("open-active");
    }
  }
  panels.addEventListener("click", toggleOpen);
  panels.addEventListener("transitionend", toggleActive);
};
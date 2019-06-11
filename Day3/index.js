window.onload = function() {
  let inputs = document.querySelectorAll(".controls input");
  function handleUpdate() {
    let hasPx = false;
    if(this.dataset.sizing) {
      hasPx = true;
    }
    document.documentElement.style.setProperty("--" + this.name, this.value + (hasPx ? "px" : ""));
  }
  inputs.forEach(input => input.addEventListener("input", handleUpdate));
};
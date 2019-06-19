window.onload = function() {
  let checkBoxes = document.querySelectorAll(".item input");
  
  function shiftSelect() {
    
  }

  window.addEventListener("keydown", (e) => {
    console.log(e.keyCode); //SHIFT KEYCODE 16
    if(e.keyCode === 16) {
      shiftSelect();
    }
  });
};
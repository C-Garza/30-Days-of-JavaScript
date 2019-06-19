window.onload = function() {
  let checkBoxes = document.querySelectorAll(".item input");
  let inbox = document.querySelector(".inbox");
  
  function shiftSelect() {
    
  }

  window.addEventListener("click", (e) => {
    console.log(e); //HAS shiftKey PROPERTY
    if(e.shiftKey) {
      shiftSelect();
    }
  });
};
window.onload = function() {
  let checkBoxes = document.querySelectorAll(".item input");
  let checkedBoxes = document.querySelectorAll(".item input:checked");
  let inbox = document.querySelector(".inbox");
  
  function shiftSelect() {
    
  }

  inbox.addEventListener("click", (e) => {
    if(event.target.tagName === "LABEL") {
      return;
    }
    checkedBoxes = document.querySelectorAll(".item input:checked");
    console.log(e.target); //HAS shiftKey PROPERTY
    if(e.shiftKey && (checkedBoxes.length > 1)) {
      shiftSelect();
    }
  });
};
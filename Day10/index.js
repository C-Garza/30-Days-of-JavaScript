window.onload = function() {
  let checkBoxes = document.querySelectorAll(".item input");
  let checkedBoxes = document.querySelectorAll(".item input:checked");
  let inbox = document.querySelector(".inbox");
  
  function shiftSelect(e) {
    let firstCheck = false;
    let lastCheckedIndex = Array.from(checkBoxes).indexOf(checkedBoxes[checkedBoxes.length - 1]);
    for(let i = 0; i < checkBoxes.length; i++) {
      if(checkBoxes[i].checked === true && !firstCheck) {
        firstCheck = true;
      }
      if(firstCheck) {
        checkBoxes[i].checked = true;
      }
      if(lastCheckedIndex === i) {
        return;
      }
    }
  }

  inbox.addEventListener("click", (e) => {
    if(event.target.tagName === "LABEL") {
      return;
    }
    checkedBoxes = Array.from(document.querySelectorAll(".item input:checked"));
    console.log(e.target); //HAS shiftKey PROPERTY
    if(e.shiftKey && (checkedBoxes.length > 1) && e.target.checked) {
      shiftSelect(e);
    }
  });
};
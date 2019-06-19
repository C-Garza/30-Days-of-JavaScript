window.onload = function() {
  let checkBoxes = document.querySelectorAll(".item input");
  let checkedBoxes = document.querySelectorAll(".item input:checked");
  let inbox = document.querySelector(".inbox");
  let shiftKey = false;
  
  function shiftSelect(e) {
    let firstCheck = false;
    let firstCheckedIndex = Array.from(checkBoxes).indexOf(checkedBoxes[0])
    let lastCheckedIndex = Array.from(checkBoxes).indexOf(checkedBoxes[checkedBoxes.length - 1]);
    for(let i = firstCheckedIndex; i < checkBoxes.length; i++) {
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

  //////SHIFT-CLICK LABEL IN FIREFOX DOES NOT TRIGGER CHECKBOX, SEE https://bugzilla.mozilla.org/show_bug.cgi?id=559506
  inbox.addEventListener("click", (e) => {
    if(e.target.tagName === "LABEL") { ////CLICK ON LABEL TRIGGERS INPUT CLICK
      e.preventDefault();
      if(e.shiftKey) {
        shiftKey = true;  ////SHIFT-KEY DOES NOT PROPAGATE IN EDGE OR FIREFOX
      }
      e.target.parentNode.children[0].click();
      return;
    }
    checkedBoxes = Array.from(document.querySelectorAll(".item input:checked"));
    if((e.shiftKey || shiftKey) && (checkedBoxes.length > 1) && e.target.checked) {
      shiftSelect(e);
      shiftKey = false;
    }
  });
};
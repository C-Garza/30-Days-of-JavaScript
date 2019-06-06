window.onload = function() {
  let secondHand = document.querySelector(".second-hand");
  let minuteHand = document.querySelector(".min-hand");
  let hourHand = document.querySelector(".hour-hand");
  getTime();

  function getDegrees(time, unit) {
    if(unit === "hour") {
      return ((time * 30)/ 60) + 90;
    }
    return ((time * 360) / 60) + 90;
  }
  function convertMilitaryTime(hour) {
    if (hour > 12) {
      return (hour - 12);
    }
  }
  function getTime() {
    let start = new Date();
    let seconds = start.getSeconds();
    let minutes = start.getMinutes();
    let hours = convertMilitaryTime(start.getHours());
    secondHand.style.transform = "rotate(" + getDegrees(seconds) + "deg)";
    minuteHand.style.transform = "rotate(" + getDegrees(minutes) + "deg)";
    hourHand.style.transform = "rotate(" + getDegrees(minutes, "hour") + "deg)";
    if(seconds === 0) {
      secondHand.classList.add("no-transition");
      secondHand.offsetHeight;
      secondHand.classList.remove("no-transition");
    }
    if(minutes === 0) {
      minuteHand.classList.add("no-transition");
      minuteHand.offsetHeight;
      minuteHand.classList.remove("no-transition");
    }
    if(hours === 0) {
      hourHand.classList.add("no-transition");
      hourHand.offsetHeight;
      hourHand.classList.remove("no-transition");
    }
  }

  setInterval(getTime, 1000);
};
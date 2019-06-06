window.onload = function() {
  let secondHand = document.querySelector(".second-hand");
  let minuteHand = document.querySelector(".min-hand");
  let hourHand = document.querySelector(".hour-hand");

  function getDegrees(time, unit) {
    if(unit === "hour") {
      return ((time * 360) / 12) + 90;
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
    hourHand.style.transform = "rotate(" + getDegrees(hours, "hour") + "deg)";
    if(seconds === 0) {
      secondHand.style.transition = "none";
      secondHand.style.transition = "all 0.05s linear;"
    }
    if(minutes === 0) {
      minuteHand.style.transition = "none";
      minuteHand.style.transition = "all 0.05s linear;"
    }
    if(hours === 0) {
      hourHand.style.transition = "none";
      hourHand.style.transition = "all 0.05s linear;"
    }
  }

  setInterval(getTime, 1000);
};
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
    if(hour === 0) {
      return (hour + 1);
    }
    if (hour > 12) {
      return (hour - 12);
    }
  }
  function getTime() {
    let start = new Date();
    let seconds = start.getSeconds();
    let minutes = start.getMinutes();
    let hours = convertMilitaryTime(start.getHours());
    console.log(hours);
    secondHand.style.transform = "rotate(" + getDegrees(seconds) + "deg)";
    minuteHand.style.transform = "rotate(" + getDegrees(minutes) + "deg)";
    hourHand.style.transform = "rotate(" + getDegrees(hours, "hour") + "deg)";
  }

  setInterval(getTime, 1000);
};
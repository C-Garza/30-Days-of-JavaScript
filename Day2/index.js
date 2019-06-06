window.onload = function() {
  let secondHand = document.querySelector(".second-hand");
  let minuteHand = document.querySelector(".min-hand");
  let hourHand = document.querySelector(".hour-hand");

  function getDegrees(time) {
    return ((time * 360) / 60) + 90;
  }
  function getTime() {
    let start = new Date();
    let seconds = start.getSeconds();
    let minutes = start.getMinutes();
    let hours = start.getHours();
    secondHand.style.transform = "rotate(" + getDegrees(seconds) + "deg)";
    minuteHand.style.transform = "rotate(" + getDegrees(minutes) + "deg)";
    hourHand.style.transform = "rotate(" + getDegrees(hours) + "deg)";
  }

  setInterval(getTime, 1000);
};
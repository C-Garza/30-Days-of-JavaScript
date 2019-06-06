window.onload = function() {
  let secondHand = document.querySelector(".second-hand");
  let minuteHand = document.querySelector(".min-hand");
  let hourHand = document.querySelector(".hour-hand");
  let weekDay = document.querySelector(".weekday");
  let dateSelector = document.querySelector(".date");
  let optionsOne = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
  let optionsTwo = {weekday: "long", year: "numeric", month: "numeric", day: "numeric"};
  let isShortStyle = false;
  ////INIT
  getTime();

  ////GET DEGREES TRAVELED
  function getDegrees(time, hour) {
    if(hour) {
      return ((time * 30)/ 60) + 90 + ((hour * 360) / 12);
    }
    return ((time * 360) / 60) + 90;
  }
  ////CONVERT HOURS AWAY FROM MILITARY TIME
  function convertMilitaryTime(hour) {
    if (hour > 12) {
      return (hour - 12);
    }
    return hour;
  }
  ////GET TIME FOR CLOCKFACE
  function getTime() {
    let start = new Date();
    let seconds = start.getSeconds();
    let minutes = start.getMinutes();
    let hours = convertMilitaryTime(start.getHours());
    secondHand.style.transform = "rotate(" + getDegrees(seconds) + "deg)";
    minuteHand.style.transform = "rotate(" + getDegrees(minutes) + "deg)";
    hourHand.style.transform = "rotate(" + getDegrees(minutes, hours) + "deg)";
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
    // getDate();
    // console.log(getDegrees(minutes, hours));
  }
  ////GET DATE
  function getDate(second, min, hour) {
    if((hour && min && second) !== 0) return;
    let start = new Date();
    weekDay.children[0].textContent = start.toLocaleDateString("en-us", {weekday: "long"});
    dateSelector.children[0].textContent = start.toLocaleDateString("en-us", optionsOne);
    // console.log(new Date().toLocaleDateString("en-us", optionsOne));
  }
  getDate(0, 0, 0);

  setInterval(getTime, 1000);
};
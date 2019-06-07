window.onload = function() {
  let weahterAPI = "https://fcc-weather-api.glitch.me/api/current?";
  let secondHand = document.querySelector(".second-hand");
  let minuteHand = document.querySelector(".min-hand");
  let hourHand = document.querySelector(".hour-hand");
  let weekDay = document.querySelector(".weekday");
  let dateSelector = document.querySelector(".date");
  let cityName = document.querySelector(".city-name");
  let weatherStatus = document.querySelector(".weather-status");
  let weatherIcon = document.querySelector(".weather-icon");
  let optionsOne = {year: "numeric", month: "long", day: "numeric"};
  let optionsTwo = {year: "numeric", month: "numeric", day: "numeric"};
  let isShortStyle = false;
  let isDegreeCelsius = true;

  ////INIT
  getTime();
  getDate(0,0,0);
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
    getDate(seconds, minutes, hours);
  }
  ////GET DATE
  function getDate(second, min, hour) {
    if(second !== 0 || min !== 0 || hour !== 0) return;
    let start = new Date();
    weekDay.children[0].textContent = start.toLocaleDateString("en-us", {weekday: "long"});
    dateSelector.children[0].textContent = start.toLocaleDateString("en-us", optionsOne);
  }
  ////GET GEOLOCATION FOR WEATHER
  function getWeather() {
    if(navigator.geolocation) {
      let location = navigator.geolocation;
      location.getCurrentPosition((position) => {
        let lat = "lat=" + position.coords.latitude;
        let long = "lon=" + position.coords.longitude;
        showWeather(lat, long);
      }, handleGeolocationError, {timeout: 10000});
    }
    else {
      console.log("Can't get Geolocation.");
    }
  }
  function showWeather(lat, long) {
    let api = weahterAPI + lat + "&" + long;
    fetch(api)
    .then(response => {
      if(response.ok) {
        return response.json()
      }
      else {
        return Promise.reject(response.status);
      }
    })
    .then(data => {
      cityName.children[0].textContent = data.name;
      weatherStatus.children[0].textContent = data.main.temp + "\u00B0" + (isDegreeCelsius ? "C" : "F");
      weatherIcon.children[0].src = data.weather[0].icon;
      weatherIcon.children[0].alt = data.weather[0].main;
    })
    .catch(error => {
      console.log("Fetch error, responded with error code: ", error);
    });
  }
  function handleGeolocationError(error) {
    if(error.code === 1) {
      console.log("PERMISSION DENIED");
      return;
    }
    if(error.code === 2) {
      console.log("POSITION UNAVAILABLE");
      return;
    }
    if(error.code === 3) {
      console.log("TIMEOUT");
      return;
    }
  }
  getWeather();

  setInterval(getTime, 1000);
};
window.onload = function() {
  let weahterAPI = "https://fcc-weather-api.glitch.me/api/current?";
  let secondHand = document.querySelector(".second-hand");
  let minuteHand = document.querySelector(".min-hand");
  let hourHand = document.querySelector(".hour-hand");
  let weekDay = document.querySelector(".weekday");
  let dateSelector = document.querySelector(".date");
  let allowButton = document.getElementById("allow-weather");
  let weatherContainer = document.querySelector(".weather-container");
  let cityName = document.querySelector(".city-name");
  let weatherStatus = document.querySelector(".weather-status");
  let weatherIcon = document.querySelector(".weather-icon");
  let optionsOne = {year: "numeric", month: "long", day: "numeric"};
  let optionsTwo = {year: "numeric", month: "numeric", day: "numeric"};
  let currentTemp = 0;
  let isShortStyle = false;
  let isDegreeCelsius = true;
  let allowWeather = false;
  let prevHour = new Date().getHours();

  ////INIT
  prevHour = convertMilitaryTime(prevHour);
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
    if(hour === 0) {
      return (hour + 12);
    }
    return hour;
  }
  ////GET TIME FOR CLOCKFACE
  function getTime() {
    let start = new Date();
    let seconds = start.getSeconds();
    let minutes = start.getMinutes();
    let dateHours = start.getHours();
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
    if(dateHours === 0) {
      hourHand.classList.add("no-transition");
      hourHand.offsetHeight;
      hourHand.classList.remove("no-transition");
    }
    getDate(seconds, minutes, hours);
    if(allowWeather && (prevHour !== hours)) {
      getWeather();
    }
    prevHour = hours;
  }
  ////GET DATE
  function getDate(second, min, hour) {
    if(second !== 0 || min !== 0 || hour !== 0) return;
    let start = new Date();
    weekDay.children[0].textContent = start.toLocaleDateString("en-us", {weekday: "long"});
    if(isShortStyle) {
      isShortStyle = false;
      dateSelector.children[0].textContent = start.toLocaleDateString("en-us", optionsTwo);
    }
    else {
      isShortStyle = true;
      dateSelector.children[0].textContent = start.toLocaleDateString("en-us", optionsOne);
    }
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
  ////FETCH WEATHER API DATA AND DISPLAY IT
  function showWeather(lat, long) {
    let api = weahterAPI + lat + "&" + long;
    fetch(api)
    .then(response => {
      if(response.ok) {
        allowButton.style.display = "none";
        weatherContainer.style.display = "inline-block";
        return response.json()
      }
      else {
        return Promise.reject(response.status);
      }
    })
    .then(data => {
      currentTemp = data.main.temp;
      if(!isDegreeCelsius) {
        convertTemperature(currentTemp);
      }
      cityName.children[0].textContent = data.name + ", " + data.sys.country;
      weatherStatus.children[0].textContent = currentTemp + "\u00B0" + (isDegreeCelsius ? "C" : "F");
      weatherIcon.children[0].src = data.weather[0].icon;
      weatherIcon.children[0].alt = data.weather[0].main;
    })
    .catch(error => {
      allowButton.style.display = "inline-block";
      weatherContainer.style.display = "none";
      console.log("Fetch error, responded with error code: ", error);
    });
  }
  ////HANDLE ERRORS THROWN BY API FETCH
  function handleGeolocationError(error) {
    allowWeather = false;
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
  ////CONVERT BETWEEN CELSIUS AND FAHRENHEIT
  function convertTemperature(temp) {
    if(isDegreeCelsius) {
      isDegreeCelsius = false;
      currentTemp = parseFloat(temp * (9.0/5.0) + 32).toFixed(2);
      return currentTemp;
    }
    else {
      isDegreeCelsius = true;
      currentTemp = parseFloat((temp - 32) * (5.0/9.0)).toFixed(2);
      return currentTemp;
    }
  }
  ////EVENT LISTENERS
  allowButton.addEventListener("click", function(e) {
    allowWeather = true;
    getWeather();
  });
  dateSelector.addEventListener("click", function(e) {
    getDate(0,0,0);
  });
  weatherContainer.addEventListener("click", function(e) {
    currentTemp = convertTemperature(currentTemp);
    weatherStatus.children[0].textContent = currentTemp + "\u00B0" + (isDegreeCelsius ? "C" : "F");
  });

  setInterval(getTime, 1000);
};
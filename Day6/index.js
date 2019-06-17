window.onload = function() {
  const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
  let cities = [];
  let searchInput = document.querySelector(".search");
  let suggestions = document.querySelector(".suggestions");
  let weahterAPI = "https://fcc-weather-api.glitch.me/api/current?";
  let currentTemp = "";
  let previousCity = "";
  let previousState = "";
  let prevTemp = "";
  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      data.map((city) => {
        cities.push(city);
      });
    })
    .catch(error => console.log("Error is ", error));
    function findMatches(word, cities) {
      return cities.filter(place => {
        let regex = new RegExp(word, "gi");
        return place.city.match(regex) || place.state.match(regex);
      });
    }
    function displayMatches() {
      if(document.querySelectorAll(".suggestions li").length >= 0) {
        Array.from(document.querySelectorAll(".suggestions li")).forEach(li => {
          li.remove();
        });
      }
      if(this.value.trim() === "") {
        suggestions.innerHTML = "<li>Filter for a city</li><li>Or a State</li>";
        return;
      }
      let matchArr = findMatches(this.value, cities);
      if(matchArr.length === 0) return;
      let regex = new RegExp(this.value, "gi");
      let listOfCities = matchArr.map((place, i) => {
        let cityName = place.city.replace(regex, "<span class='hl'>" + this.value + "</span>");
        let stateName = place.state.replace(regex, "<span class='hl'>" + this.value + "</span>");
        return `
          <li>
            <span class="name">${cityName}, ${stateName}</span>
            <span class="population">${parseInt(place.population, 10).toLocaleString()}</span>
          </li>
        `
      }).join("");
      suggestions.innerHTML = listOfCities;
      let lat = "lat=" + parseFloat(matchArr[0].latitude);
      let long = "lon=" + parseFloat(matchArr[0].longitude);
      if(previousCity === matchArr[0].city && previousState === matchArr[0].state) {
        suggestions.children[0].appendChild(prevTemp);
        return;
      }
      showWeather(lat, long);
      previousCity = matchArr[0].city;
      previousState = matchArr[0].state;
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
        currentTemp = data.main.temp;
        convertTemperature(currentTemp);
        let span = document.createElement("span");
        let text = document.createTextNode(currentTemp + "\u00B0 F");
        span.classList.add("weather");
        span.appendChild(text);
        prevTemp = span;
        suggestions.children[0].appendChild(span);
      })
      .catch(error => {
        console.log("Fetch error, responded with error code: ", error);
      });
    }
    function convertTemperature(temp) {
      currentTemp = parseFloat(temp * (9.0/5.0) + 32).toFixed(2);
      return currentTemp;
    }
    searchInput.addEventListener("input", displayMatches);
};
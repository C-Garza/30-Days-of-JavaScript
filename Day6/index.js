window.onload = function() {
  const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
  let cities = [];
  let searchInput = document.querySelector(".search");
  let suggestions = document.querySelector(".suggestions");
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
      let regex = new RegExp(this.value, "gi");
      let listOfCities = matchArr.map(place => {
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
    }
    searchInput.addEventListener("input", displayMatches);
};
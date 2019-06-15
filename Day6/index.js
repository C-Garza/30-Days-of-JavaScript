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
      let matchArr = findMatches(this.value, cities);
      console.log(matchArr);
    }
    searchInput.addEventListener("input", displayMatches);
};
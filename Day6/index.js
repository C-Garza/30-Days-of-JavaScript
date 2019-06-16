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
      if(document.querySelectorAll(".suggestions li").length > 2) {
        Array.from(document.querySelectorAll(".suggestions li")).slice(2).forEach(li => {
          li.remove();
        });
      }
      if(this.value.trim() === "") return;
      let matchArr = findMatches(this.value, cities);
      let fragment = document.createDocumentFragment();
      matchArr.forEach(place => {
        let li = document.createElement("li");
        let spanName = document.createElement("span");
        let spanPop = document.createElement("span");
        let nameText = document.createTextNode(place.city + ", " + place.state);
        let popText = document.createTextNode(place.population);
        spanName.classList.add("name");
        spanPop.classList.add("population");
        spanName.appendChild(nameText);
        spanPop.appendChild(popText);
        li.appendChild(spanName);
        li.appendChild(spanPop);
        fragment.appendChild(li);
      });
      suggestions.appendChild(fragment);
    }
    searchInput.addEventListener("input", displayMatches);
};
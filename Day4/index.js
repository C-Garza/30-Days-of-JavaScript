window.onload = function() {
  // Some data we can work with
  const inventors = [
    { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
    { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
    { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
    { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
    { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
    { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
    { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
    { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
    { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
    { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
    { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
    { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
  ];
  const people = ['Beck, Glenn', 'Zebra, Animal', 'Armadillo, Animal', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black, Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William'];
  function createTable(arr, headers, description) {
    if(arr.constructor !== Array) return;
    if(arr.length === 0) return;
    let innerObject = Object.keys(arr[0]);
    let isString = false;
    if(typeof arr[0] === "string") {
      isString = true;
    }
    let table = document.createElement("table");
    let tableHead = document.createElement("thead");
    if(description) {
      let caption = document.createElement("caption");
      let text = document.createTextNode(description);
      caption.appendChild(text);
      table.appendChild(caption);
      table.appendChild(tableHead);
    }
    else {
      table.appendChild(tableHead);
    }
    if(!headers) {
      let tr = document.createElement("tr");
      for(let i = 0; i < innerObject.length; i++) {
        let th = document.createElement("th");
        let capitalize = innerObject[i].charAt(0).toUpperCase() + innerObject[i].slice(1);
        let text = document.createTextNode(capitalize);
        th.appendChild(text);
        tr.appendChild(th);
      }
      tableHead.appendChild(tr);
    }
    else {
      let tr = document.createElement("tr");
      let th = document.createElement("th");
      let text = document.createTextNode(headers);
      th.appendChild(text);
      tr.appendChild(th);
      tableHead.appendChild(tr);
    }
    let tableBody = document.createElement("tbody");
    table.appendChild(tableBody);
    if(isString) {
      for(let i = 0; i < arr.length; i++) {
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        let text = document.createTextNode(arr[i]);
        td.appendChild(text);
        tr.appendChild(td);
        tableBody.appendChild(tr);
      }
    }
    else {
      for(let i = 0; i < arr.length; i++) {
        let tr = document.createElement("tr");
        Object.keys(arr[i]).forEach(key => {
          let td = document.createElement("td");
          let text = document.createTextNode(arr[i][key]);
          td.appendChild(text);
          tr.appendChild(td);
        });
        tableBody.appendChild(tr);
      }
    }
    isString = false;
    document.body.appendChild(table);
  }
  createTable(inventors, false, "List of Inventors");

  // Array.prototype.filter()
  // 1. Filter the list of inventors for those who were born in the 1500's
  let bornIn1500s = inventors.filter(person => {
    return person.year <= 1599 && person.year >= 1500;
  });
  console.table(bornIn1500s);
  createTable(bornIn1500s, false, "Inventors born in 16th century");

  // Array.prototype.map()
  // 2. Give us an array of the inventors' first and last names
  let names = inventors.map(person => {
    return person.first + " " + person.last;
  });
  console.table(names);
  createTable(names, "Inventor Names");

  // Array.prototype.sort()
  // 3. Sort the inventors by birthdate, oldest to youngest
  let sortByOldest = inventors.sort((a,b) => {
    return a.year - b.year;
  });
  console.table(sortByOldest);
  createTable(sortByOldest, false, "Sorted by birthdate, oldest to newest");

  // Array.prototype.reduce()
  // 4. How many years did all the inventors live?
  let totalYearsLived = inventors.reduce((acc, currentValue) => {
    return acc + (currentValue.passed - currentValue.year);
  }, 0);
  console.log("TOTAL YEARS LIVED: " + totalYearsLived);

  // 5. Sort the inventors by years lived
  let yearsLived = inventors.sort((a,b) => {
    return (b.passed - b.year) - (a.passed - a.year);
  });
  console.table(yearsLived);
  createTable(yearsLived, false, "Sorted by oldest to youngest");

  // 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
  // https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
  let wikiAPI = "https://en.wikipedia.org/w/api.php?&action=query&format=json&origin=*&list=categorymembers&cmtitle=category%3A%20Boulevards%20in%20Paris&cmlimit=50";
  fetch(wikiAPI)
  .then(response => response.json())
  .then(data => {
    let streets = data.query.categorymembers;
    let streetsTable = streets.map(link => {
      return link.title;
    });
    let de = streets.map(link => {
      return link.title;
    })
    .filter(street => {
      return street.includes("de");
    });
    createTable(streetsTable, "List of Paris Boulevards");
    createTable(de, "List of Paris Boulevards containing 'de'")
    console.table(streets, ["title"]);
    console.table(de);
  })
  .catch(error => console.log('Error is', error));

  // 7. sort Exercise
  // Sort the people alphabetically by last name
  let sortByLast = people.sort((a,b) => {
    let aLast = a.toLowerCase();
    let bLast = b.toLowerCase();
    return aLast < bLast ? -1 : 1;
  });
  console.log(sortByLast);
  //BETTER WAY
  let newSortByLast = people.sort((a,b) => {
    return a.localeCompare(b);
  });
  console.log(newSortByLast);
  createTable(newSortByLast, "Sorted Alphabetically by Last Name");

  // 8. Reduce Exercise
  // Sum up the instances of each of these
  const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];
  let total = data.reduce((acc, currentValue) => {
    if(currentValue in acc) {
      acc[currentValue]++;
    }
    else {
      acc[currentValue] = 1;
    }
    return acc;
  }, {});
  console.table(total);
  createTable(data, "List of Vehicles");
  createTable([total], false, "Total instances of word in 'List of Vehicles'");

};
window.onload = function() {
  const dogs = [{ name: 'Snickers', age: 2 }, { name: 'hugo', age: 8 }];
  let stringVar = "new";

  function makeGreen() {
    const p = document.querySelector('p');
    p.style.color = '#BADA55';
    p.style.fontSize = '50px';
  }
  document.querySelector("p").onclick = makeGreen;

  // Regular
  console.log("hello");

  // Interpolated
  console.log("Hello I am a %s string!", "new");
  console.log(`Hello I am a ${stringVar} string!`);

  // Styled
  console.log("%c I am some great text", "font-size:50px; color: red;");

  // warning!
  console.warn("OH NOOO!");

  // Error :|
  console.error("Shoot!");

  // Info
  console.info("Crocodiles eat 3-4 people per year");

  // Testing
  let p = document.querySelector("p");
  console.assert(1 === 2, "That is wrong!");
  console.assert(p.classList.contains("ouch"), "That is wrong!");

  // clearing
  console.clear();

  // Viewing DOM Elements
  console.log(p);
  console.dir(p);

  // Grouping together
  dogs.forEach(dog => {
    console.groupCollapsed(dog.name);
    console.log("This is " + dog.name + ".");
    console.log(dog.name + " is " + dog.age + " years old.");
    console.log(dog.name + " is " + (dog.age * 7) + " dog years old.");
    console.groupEnd(dog.name);
  });

  // counting
  console.count("Chris");
  console.count("Wes");
  console.count("Chris");
  console.count("Chris");
  console.count("Chris");
  console.count("Wes");
  console.count("Chris");
  console.count("Wes");
  console.count("Wes");

  // timing
  console.time("fetching data");
  fetch("https://api.github.com/users/c-garza")
    .then(response => response.json())
    .then(data => {
      console.timeEnd("fetching data");
      console.log(data);
    });

    console.table(dogs);

};
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

  // warning!

  // Error :|

  // Info

  // Testing

  // clearing

  // Viewing DOM Elements

  // Grouping together

  // counting

  // timing

};
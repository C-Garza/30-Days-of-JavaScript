window.onload = function() {
  let pressed = [];
  let sequence = "38384040373937396665";
  
  window.addEventListener("keyup", (e) => {
    pressed.push(e.keyCode);
    pressed.splice(-sequence.length / 2 - 1, pressed.length - sequence.length / 2);
    if(pressed.join("").includes(sequence)) {
      console.log("ALL YOUR BASE ARE BELONG TO US");
      cornify_add();
    }
    console.log(pressed);
  });
};
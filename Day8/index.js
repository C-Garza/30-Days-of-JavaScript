window.onload = function() {
  let canvas = document.getElementById("draw");
  let clearButton = document.getElementById("clear");
  let ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.strokeStyle = "#BADA55";
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.lineWidth = 100;

  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  let hue = 0;
  let direction = true;

  function draw(e) {
    if(!isDrawing) return;
    ctx.strokeStyle = "hsl(" + hue + ", 100%, 50%)";
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    if(e.targetTouches) {
      ctx.lineTo(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
    }
    else {
      ctx.lineTo(e.offsetX, e.offsetY);
    }
    ctx.stroke();

    if(e.targetTouches) {
      lastX = e.targetTouches[0].pageX;
      lastY = e.targetTouches[0].pageY;
    }
    else {
      lastX = e.offsetX;
      lastY = e.offsetY;
    }
    hue++;
    if(hue >= 360) {
      hue = 0;
    }
    if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
      direction = !direction;
    }
    if(direction) {
      ctx.lineWidth++;
    }
    else {
      ctx.lineWidth--;
    }
  }

  //EVENT LISTENERS FOR MOUSE
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mousedown", (e) => {
    isDrawing = true
    lastX = e.offsetX;
    lastY = e.offsetY;
  });
  canvas.addEventListener("mouseup", () => isDrawing = false);
  canvas.addEventListener("mouseout", () => isDrawing = false);
  //EVENT LISTENERS FOR TOUCH
  canvas.addEventListener("touchmove", draw);
  canvas.addEventListener("touchstart", (e) => {
    isDrawing = true;
    lastX = e.targetTouches[0].pageX;
    lastY = e.targetTouches[0].pageY;
  });
  canvas.addEventListener("touchend", () => isDrawing = false);
  canvas.addEventListener("touchcancel", () => isDrawing = false);

  clearButton.addEventListener("click", () => ctx.clearRect(0, 0, canvas.width, canvas.height));
};
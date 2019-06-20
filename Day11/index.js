window.onload = function() {
  let player = document.querySelector(".player");
  let video = player.querySelector(".viewer");
  let progress = player.querySelector(".progress");
  let progressBar = player.querySelector(".progress__filled");
  let toggle = player.querySelector(".toggle");
  let ranges = player.querySelectorAll(".player__slider");
  let skipButtons = player.querySelectorAll("[data-skip]");

  function togglePlay() {
    if(video.paused) {
      video.play();
    }
    else {
      video.pause();
    }
  }
  function updateButton() {
    let icon = this.paused ? "►" : "❚ ❚";
    toggle.textContent = icon;
  }
  function skip(e) {
    video.currentTime += parseFloat(e.dataset.skip);
  }

  player.addEventListener("click", (e) => {
    if(e.target === toggle || e.target === video) {
      togglePlay();
    }
    skipButtons.forEach(button => {
      if(e.target === button) {
        skip(e.target);
      }
    });
  });
  video.addEventListener("play", updateButton);
  video.addEventListener("pause", updateButton);
};
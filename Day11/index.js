window.onload = function() {
  let player = document.querySelector(".player");
  let video = player.querySelector(".viewer");
  let progress = player.querySelector(".progress");
  let progressBar = player.querySelector(".progress__filled");
  let toggle = player.querySelector(".toggle");
  let ranges = player.querySelectorAll(".player__slider");
  let skipButtons = player.querySelectorAll("[data-skip]");
  let fullscreen = player.querySelector(".fullscreen");
  let mousedown = false;

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
  function handleRangeUpdate() {
    video[this.name] = this.value;
  }
  function handleProgress() {
    let percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = percent + "%";
  }
  function scrub(e) {
    let scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
  }
  function toggleFullscreen() {
    if(!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)) {
      if(player.requestFullscreen) {
        player.requestFullscreen();
      }
      else if(player.mozRequestFullScreen) {
        player.mozRequestFullScreen();
      }
      else if(player.webkitRequestFullscreen) {
        player.webkitRequestFullscreen();
      }
      else if(player.msRequestFullscreen) {
        player.msRequestFullscreen();
      }
    }
    else {
      if(document.exitFullscreen) {
        document.exitFullscreen();
      }
      else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      }
      else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      else if(document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }

  player.addEventListener("click", (e) => {
    if(e.target === toggle || e.target === video) {
      togglePlay();
    }
    if(e.target === progress || e.target === progressBar) {
      scrub(e);
    }
    if(e.target === fullscreen) {
      toggleFullscreen();
    }
    skipButtons.forEach(button => {
      if(e.target === button) {
        skip(e.target);
      }
    });
  });
  video.addEventListener("play", updateButton);
  video.addEventListener("pause", updateButton);
  video.addEventListener("timeupdate", handleProgress);
  progress.addEventListener("mousemove", (e) => {
    if(mousedown) {
      scrub(e);
    }
  });
  progress.addEventListener("mousedown", () => mousedown = true);
  progress.addEventListener("mouseup", () => mousedown = false);
  progress.addEventListener("mouseout", () => mousedown = false);
  ranges.forEach(range => range.addEventListener("input", handleRangeUpdate));
};
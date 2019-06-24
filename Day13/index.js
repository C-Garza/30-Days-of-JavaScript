window.onload = function() {
  let slideImages = document.querySelectorAll(".slide-in");

  function checkSlide(e) {
    slideImages.forEach(image => {
      let slideInAt = (window.scrollY + window.innerHeight) - (image.height / 2);
      let slideBottom = image.offsetTop + image.height;
      let isHalfShown = slideInAt > image.offsetTop;
      let isNotScrolledPast = window.scrollY < slideBottom;
      if(isHalfShown && isNotScrolledPast) {
        image.classList.add("active");
      }
      else {
        image.classList.remove("active");
      }
    });
  }
  function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
      let context = this, args = arguments;
      let later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  window.addEventListener("scroll", debounce(checkSlide));
};
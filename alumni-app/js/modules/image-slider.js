const slides = document.querySelectorAll('.slides');

const switchSpeed = 2500; // milliseconds
let imgIndex = 1; // By default first image will be shown

function showSlide() {
  slides.forEach(img => {
    img.classList.remove('active');
  });

  if (imgIndex > slides.length) {
    imgIndex = 1;
  }

  if (imgIndex <= 0) {
    imgIndex = slides.length;
  }

  slides[imgIndex - 1].classList.add('active');

  // Automatically plays slides
  setTimeout(() => {
    imgIndex++;
    showSlide();
  }, switchSpeed);
}

showSlide();

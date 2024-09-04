function initCarousel() {
  const carouselInner = document.querySelector('.carousel__inner');
  const carouselArrRight = document.querySelector('.carousel__arrow_right');
  const carouselArrLeft = document.querySelector('.carousel__arrow_left');

  const slideWidth = carouselInner.offsetWidth;
  const totalSlides = 4;
  let currentSlide = 0;

  carouselArrLeft.style.display = 'none';

  carouselArrRight.addEventListener('click', () => {
    currentSlide++;
    carouselInner.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
    updateArr();
  });

  carouselArrLeft.addEventListener('click', () => {
    currentSlide--;
    carouselInner.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
    updateArr();
  });

  function updateArr() {
    if (currentSlide === 0) {
      carouselArrLeft.style.display = 'none';
    } else {
      carouselArrLeft.style.display = '';
    }

    if (currentSlide === totalSlides - 1) {
      carouselArrRight.style.display = 'none';
    } else {
      carouselArrRight.style.display = '';
    }

  }
}

import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.currentSlideIndex = 0;
    this.elem = this.render();
    this.initCarousel();
    this.addProductEvent();
  }

  render() {
    // Создание корневого элемента карусели
    const carousel = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
          ${this.slides.map(slide => this.createSlide(slide)).join('')}
        </div>
      </div>
    `);

    return carousel;
  }

  createSlide(slide) {
    return `
      <div class="carousel__slide" data-id="${slide.id}">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `;
  }

  initCarousel() {
    const rightArrow = this.elem.querySelector('.carousel__arrow_right');
    const leftArrow = this.elem.querySelector('.carousel__arrow_left');
    const carouselInner = this.elem.querySelector('.carousel__inner');

    // Изначально скрываем левую стрелку
    leftArrow.style.display = 'none';

    rightArrow.addEventListener('click', () => {
      this.currentSlideIndex++;
      this.updateCarousel(carouselInner, rightArrow, leftArrow);
    });

    leftArrow.addEventListener('click', () => {
      this.currentSlideIndex--;
      this.updateCarousel(carouselInner, rightArrow, leftArrow);
    });
  }

  updateCarousel(carouselInner, rightArrow, leftArrow) {
    const slideWidth = carouselInner.querySelector('.carousel__slide').offsetWidth;
    carouselInner.style.transform = `translateX(-${this.currentSlideIndex * slideWidth}px)`;

    // Показываем/скрываем стрелки
    if (this.currentSlideIndex === this.slides.length - 1) {
      rightArrow.style.display = 'none';
    } else {
      rightArrow.style.display = '';
    }

    if (this.currentSlideIndex === 0) {
      leftArrow.style.display = 'none';
    } else {
      leftArrow.style.display = '';
    }
  }

  addProductEvent() {
    this.elem.addEventListener('click', (event) => {
      if (event.target.closest('.carousel__button')) {
        const slide = event.target.closest('.carousel__slide');
        const productId = slide.dataset.id;

        const productAddEvent = new CustomEvent('product-add', {
          detail: productId,
          bubbles: true
        });

        this.elem.dispatchEvent(productAddEvent);
      }
    });
  }
}

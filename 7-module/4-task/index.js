export default class StepSlider {
  constructor({steps, value = 0}) {
    this.steps = steps;
    this.value = value;
    this.elem = this.createSliderElement();
    this.updateSlider();
    this.elem.addEventListener('click', this.onSliderClick.bind(this));
    const thumb = this.elem.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;
    thumb.addEventListener('pointerdown', this.onThumbPointerDown.bind(this));
  }

  createSliderElement() {
    const slider = document.createElement('div');
    slider.className = 'slider';
    slider.innerHTML = `
      <div class="slider__thumb">
        <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress"></div>
      <div class="slider__steps">
        ${'<span></span>'.repeat(this.steps)}
      </div>
    `;
    return slider;
  }

  updateSlider() {
    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');
    const steps = this.elem.querySelectorAll('.slider__steps span');
    thumb.querySelector('.slider__value').textContent = this.value;
    const segments = this.steps - 1;
    const valuePercents = (this.value / segments) * 100;
    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
    steps.forEach((step, index) => {
      step.classList.toggle('slider__step-active', index === this.value);
    });
  }

  onSliderClick(event) {
    const left = event.clientX - this.elem.getBoundingClientRect().left;
    const leftRelative = left / this.elem.offsetWidth;
    const segments = this.steps - 1;
    const approximateValue = leftRelative * segments;
    this.value = Math.round(approximateValue);
    this.updateSlider();
    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));
  }

  onThumbPointerDown(event) {
    event.preventDefault();
    this.elem.classList.add('slider_dragging');
    document.addEventListener('pointermove', this.onPointerMove);
    document.addEventListener('pointerup', this.onPointerUp);
  }

  onPointerMove = (event) => {
    const left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    if (leftRelative < 0) leftRelative = 0;
    if (leftRelative > 1) leftRelative = 1;
    const segments = this.steps - 1;
    const approximateValue = leftRelative * segments;
    this.value = Math.round(approximateValue);
    const leftPercents = leftRelative * 100;
    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');
    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
    const steps = this.elem.querySelectorAll('.slider__steps span');
    steps.forEach((step, index) => {
      step.classList.toggle('slider__step-active', index === this.value);
    });
    thumb.querySelector('.slider__value').textContent = this.value;
  };

  onPointerUp = () => {
    this.elem.classList.remove('slider_dragging');
    document.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('pointerup', this.onPointerUp);
    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));
  };
}

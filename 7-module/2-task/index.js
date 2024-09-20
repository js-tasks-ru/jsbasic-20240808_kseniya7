export default class Modal {
  constructor() {
    this.modal = document.createElement('div');
    this.modal.classList.add('modal');
    this.modal.innerHTML = `
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title">Вот сюда нужно добавлять заголовок</h3>
        </div>
        <div class="modal__body">A сюда нужно добавлять содержимое тела модального окна</div>
      </div>
    `;

    this.modal.querySelector('.modal__close').addEventListener('click', () => this.close());
    this.keydownHandler = this.onKeyDown.bind(this);
  }

  open() {
    document.body.appendChild(this.modal);
    document.body.classList.add('is-modal-open');
    document.addEventListener('keydown', this.keydownHandler);
  }

  setTitle(title) {
    this.modal.querySelector('.modal__title').textContent = title;
  }

  setBody(node) {
    const modalBody = this.modal.querySelector('.modal__body');
    modalBody.innerHTML = '';
    modalBody.appendChild(node);
  }

  close() {
    if (this.modal.parentNode) {
      this.modal.parentNode.removeChild(this.modal);
      document.body.classList.remove('is-modal-open');
      document.removeEventListener('keydown', this.keydownHandler);
    }
  }

  onKeyDown(event) {
    if (event.code === 'Escape') {
      this.close();
    }
  }
}

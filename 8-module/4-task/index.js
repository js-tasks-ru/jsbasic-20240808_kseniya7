import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) return;

    const existingCartItem = this.cartItems.find(item => item.product.id === product.id);

    if (existingCartItem) {
      existingCartItem.count += 1;
      this.onProductUpdate(existingCartItem);
    } else {
      const newCartItem = {
        product: product,
        count: 1
      };

      this.cartItems.push(newCartItem);
      this.onProductUpdate(newCartItem);
    }
  }

  updateProductCount(productId, amount) {
    const cartItem = this.cartItems.find(item => item.product.id === productId);

    if (cartItem) {
      cartItem.count += amount;

      if (cartItem.count <= 0) {
        this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
      }

      this.onProductUpdate(cartItem);
    }
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((total, item) => total + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.count, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
      2
    )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    const modal = new Modal();
    const modalBody = document.createElement('div');

    const modalTitle = 'Your order';
    modal.setTitle(modalTitle);

    this.cartItems.forEach(cartItem => {
      const productElement = this.renderProduct(cartItem.product, cartItem.count);
      modalBody.append(productElement);
    });

    const orderForm = this.renderOrderForm();
    modalBody.append(orderForm);

    modal.setBody(modalBody);

    modal.open();

    modalBody.addEventListener('click', (event) => {
      const target = event.target.closest('.cart-counter__button');

      if (target) {
        const productId = target.closest('.cart-product').dataset.productId;

        if (target.classList.contains('cart-counter__button_plus')) {
          this.updateProductCount(productId, 1);
        }

        if (target.classList.contains('cart-counter__button_minus')) {
          this.updateProductCount(productId, -1);
        }
      }
    });

    const form = modalBody.querySelector('.cart-form');
    form.addEventListener('submit', (event) => this.onSubmit(event));
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (document.body.classList.contains('is-modal-open')) {
      const productId = cartItem.product.id;
      const modalBody = document.querySelector('.modal__body');

      const productCountElement = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      const productPriceElement = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      const totalPriceElement = modalBody.querySelector('.cart-buttons__info-price');

      productCountElement.innerHTML = cartItem.count;
      productPriceElement.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
      totalPriceElement.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;

      if (this.isEmpty()) {
        document.querySelector('.modal').remove();
        document.body.classList.remove('is-modal-open');
      }
    }
  }

  async onSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.classList.add('is-loading');

    const formData = new FormData(form);
    try {
      const response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        document.querySelector('.modal__title').innerHTML = 'Success!';

        this.cartItems = [];

        const modalBody = document.querySelector('.modal__body');
        modalBody.innerHTML = `
        <div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>
      `;
      }
    } catch (error) {
      console.error('Failed to submit the order', error);
    } finally {
      submitButton.classList.remove('is-loading');
    }
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}


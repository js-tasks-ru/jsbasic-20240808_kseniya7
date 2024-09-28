export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}


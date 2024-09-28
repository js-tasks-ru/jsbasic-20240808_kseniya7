import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = this.createGridElement();
    this.renderProducts();
  }

  createGridElement() {
    const container = document.createElement('div');
    container.className = 'products-grid';
    const innerContainer = document.createElement('div');
    innerContainer.className = 'products-grid__inner';
    container.appendChild(innerContainer);
    return container;
  }

  renderProducts() {
    const innerContainer = this.elem.querySelector('.products-grid__inner');
    innerContainer.innerHTML = '';
    const filteredProducts = this.applyFilters();
    filteredProducts.forEach(product => {
      const card = new ProductCard(product);
      innerContainer.appendChild(card.elem);
    });
  }

  applyFilters() {
    return this.products.filter(product => {
      const noNuts = this.filters.noNuts ? !product.nuts : true;
      const vegetarian = this.filters.vegeterianOnly ? product.vegeterian : true;
      const spiciness = product.spiciness <= (this.filters.maxSpiciness || 4);
      const category = this.filters.category ? product.category === this.filters.category : true;
      return noNuts && vegetarian && spiciness && category;
    });
  }

  updateFilter(newFilters) {
    Object.assign(this.filters, newFilters);
    this.renderProducts();
  }
}


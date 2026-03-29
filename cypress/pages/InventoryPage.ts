export class InventoryPage {
  // locators
  inventoryItem = '[data-test="inventory-item"]';
  inventoryItemName = '[data-test="inventory-item-name"]';
  inventoryItemPrice = '[data-test="inventory-item-price"]';
  addToCartButton = 'button[data-test^="add-to-cart"]';
  removeButton = 'button[data-test^="remove"]';
  shoppingCartLink = '[data-test="shopping-cart-link"]';
  shoppingCartBadge = '[data-test="shopping-cart-badge"]';
  sortDropdown = '[data-test="product-sort-container"]';

  getInventoryItems() {
    return cy.get(this.inventoryItem);
  }

  getCartBadge() {
    return cy.get(this.shoppingCartBadge);
  }

  openCart() {
    cy.get(this.shoppingCartLink).click();
  }

  addProductToCartByName(productName: string) {
    this.getInventoryItems()
      .contains(this.inventoryItemName, productName)
      .parents(this.inventoryItem)
      .find(this.addToCartButton)
      .click();
  }

  removeProductByName(productName: string) {
    this.getInventoryItems()
      .contains(this.inventoryItemName, productName)
      .parents(this.inventoryItem)
      .find(this.removeButton)
      .click();
  }

  getProductPriceByName(productName: string) {
    return this.getInventoryItems()
      .contains(this.inventoryItemName, productName)
      .parents(this.inventoryItem)
      .find(this.inventoryItemPrice);
  }

  shouldNotShowCartBadge() {
    cy.get(this.shoppingCartBadge).should("not.exist");
  }

  getSortDropdown() {
    return cy.get(this.sortDropdown);
  }

  selectSortOption(option: string) {
    this.getSortDropdown().select(option);
  }

  getProductNames() {
    return this.getInventoryItems()
      .find(this.inventoryItemName)
      .then(($els) => Cypress._.map($els, 'innerText'));
  }

  getProductPrices() {
    return this.getInventoryItems()
      .find(this.inventoryItemPrice)
      .then(($els) =>
        Cypress._.map($els, (el) =>
          parseFloat(el.innerText.replace('$', ''))
        )
      );
  }
}
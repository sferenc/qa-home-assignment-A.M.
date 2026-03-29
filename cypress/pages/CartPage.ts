export class CartPage {
  cartList = '[data-test="cart-list"]';
  cartItem = '[data-test="inventory-item"]';
  cartItemName = '[data-test="inventory-item-name"]';
  checkoutButton = '[data-test="checkout"]';
  continueShoppingButton = '[data-test="continue-shopping"]';
  removeButton = 'button[data-test^="remove"]';

  getCartList() {
    return cy.get(this.cartList);
  }

  getCartItems() {
    return cy.get(this.cartItem);
  }

  clickCheckout() {
    cy.get(this.checkoutButton).click();
  }

  clickContinueShopping() {
    cy.get(this.continueShoppingButton).click();
  }

  removeProductByName(productName: string) {
    this.getCartItems()
      .contains(this.cartItemName, productName)
      .parents(this.cartItem)
      .find(this.removeButton)
      .click();
  }

  getProductByName(productName: string) {
    return this.getCartItems()
      .contains(this.cartItemName, productName)
      .parents(this.cartItem);
  }

  shouldNotContainProduct(productName: string) {
    this.getCartList().should("not.contain.text", productName);
  }
}
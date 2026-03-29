export class CheckoutOverviewPage {
  cartList = '[data-test="cart-list"]';
  cartItem = '[data-test="inventory-item"]';
  cartItemName = '[data-test="inventory-item-name"]';

  paymentInfo = '[data-test="payment-info-value"]';
  shippingInfo = '[data-test="shipping-info-value"]';
  subtotalLabel = '[data-test="subtotal-label"]';
  taxLabel = '[data-test="tax-label"]';
  totalLabel = '[data-test="total-label"]';

  finishButton = '[data-test="finish"]';
  cancelButton = '[data-test="cancel"]';

  getCartList() {
    return cy.get(this.cartList);
  }

  getCartItems() {
    return cy.get(this.cartItem);
  }

  getProductByName(productName: string) {
    return this.getCartItems()
      .contains(this.cartItemName, productName)
      .parents(this.cartItem);
  }

  getPaymentInfo() {
    return cy.get(this.paymentInfo);
  }

  getShippingInfo() {
    return cy.get(this.shippingInfo);
  }

  getSubtotalLabel() {
    return cy.get(this.subtotalLabel);
  }

  getTaxLabel() {
    return cy.get(this.taxLabel);
  }

  getTotalLabel() {
    return cy.get(this.totalLabel);
  }

  clickFinish() {
    cy.get(this.finishButton).click();
  }

  clickCancel() {
    cy.get(this.cancelButton).click();
  }
}
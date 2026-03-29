export class CheckoutCompletePage {
  completeHeader = '[data-test="complete-header"]';
  completeText = '[data-test="complete-text"]';
  backHomeButton = '[data-test="back-to-products"]';

  getCompleteHeader() {
    return cy.get(this.completeHeader);
  }

  getCompleteText() {
    return cy.get(this.completeText);
  }

  clickBackHome() {
    cy.get(this.backHomeButton).click();
  }
}
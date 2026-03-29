type CheckoutInformation = {
  firstName?: string;
  lastName?: string;
  postalCode?: string;
};

export class CheckoutInformationPage {
  firstNameInput = '[data-test="firstName"]';
  lastNameInput = '[data-test="lastName"]';
  postalCodeInput = '[data-test="postalCode"]';
  continueButton = '[data-test="continue"]';
  cancelButton = '[data-test="cancel"]';
  errorMessage = '[data-test="error"]';

  typeFirstName(firstName: string) {
    cy.get(this.firstNameInput).type(firstName);
  }

  typeLastName(lastName: string) {
    cy.get(this.lastNameInput).type(lastName);
  }

  typePostalCode(postalCode: string) {
    cy.get(this.postalCodeInput).type(postalCode);
  }

  clickContinue() {
    cy.get(this.continueButton).click();
  }

  clickCancel() {
    cy.get(this.cancelButton).click();
  }

  fillInformation(data: CheckoutInformation) {
    if (data.firstName !== undefined) {
      this.typeFirstName(data.firstName);
    }

    if (data.lastName !== undefined) {
      this.typeLastName(data.lastName);
    }

    if (data.postalCode !== undefined) {
      this.typePostalCode(data.postalCode);
    }
  }

  continueWithInformation(data: CheckoutInformation) {
    this.fillInformation(data);
    this.clickContinue();
  }

  getErrorMessage() {
    return cy.get(this.errorMessage);
  }
}
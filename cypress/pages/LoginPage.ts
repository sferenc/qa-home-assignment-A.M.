export class LoginPage {
  // locators
  usernameInput = '[data-test="username"]';
  passwordInput = '[data-test="password"]';
  loginButton = '[data-test="login-button"]';

  visit() {
    cy.visit('/');
  }

  typeUsername(username: string) {
    cy.get(this.usernameInput).type(username);
  }

  typePassword(password: string) {
    cy.get(this.passwordInput).type(password);
  }

  clickLogin() {
    cy.get(this.loginButton).click();
  }

  login() {
    this.typeUsername(Cypress.env("sauceUsername"));
    this.typePassword(Cypress.env("saucePassword"));
    this.clickLogin();
  }
}
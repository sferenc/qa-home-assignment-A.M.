import { CartPage } from "../../pages/CartPage";
import { CheckoutCompletePage } from "../../pages/CheckoutCompletePage";
import { CheckoutInformationPage } from "../../pages/CheckoutInformationPage";
import { CheckoutOverviewPage } from "../../pages/CheckoutOverviewPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { LoginPage } from "../../pages/LoginPage";

describe('Checkout flow', () => {
  const loginPage = new LoginPage();
  const inventoryPage = new InventoryPage();
  const cartPage = new CartPage();
  const checkoutInformationPage = new CheckoutInformationPage();
  const checkoutOverviewPage = new CheckoutOverviewPage();
  const checkoutCompletePage = new CheckoutCompletePage();

  const defaultProduct = 'Sauce Labs Backpack';
  const secondProduct = "Sauce Labs Bike Light";
  const firstName = 'Feri';
  const lastName = 'Test';
  const postalCode = '4032';

  beforeEach(() => {
    loginPage.visit();
    loginPage.login();

    inventoryPage.getInventoryItems().should("be.visible");
  });

  it('should complete a purchase successfully', () => {
    inventoryPage.addProductToCartByName(defaultProduct);
    inventoryPage.getCartBadge().should("have.text", "1");
    inventoryPage.openCart();

    cartPage.getCartList().should("be.visible");
    cartPage.getProductByName(defaultProduct).should("be.visible");
    cartPage.clickCheckout();

     checkoutInformationPage.continueWithInformation({
      firstName,
      lastName,
      postalCode,
    });
  
    checkoutOverviewPage.getCartList().should('be.visible');
    checkoutOverviewPage.getProductByName(defaultProduct).should('be.visible');
    checkoutOverviewPage.getPaymentInfo().should('be.visible');
    checkoutOverviewPage.getShippingInfo().should('be.visible');
    checkoutOverviewPage.getTotalLabel().should('contain.text', 'Total');
    checkoutOverviewPage.clickFinish();

    checkoutCompletePage
      .getCompleteHeader()
      .should("have.text", "Thank you for your order!");

    checkoutCompletePage
      .getCompleteText()
      .should("contain.text", "Your order has been dispatched");
  });

  it('should complete the checkout successfully with two products', () => {
    inventoryPage.addProductToCartByName(defaultProduct);
    inventoryPage.addProductToCartByName(secondProduct);
    inventoryPage.getCartBadge().should("have.text", "2");
    inventoryPage.openCart();

    cartPage.getCartList().should("be.visible");
    cartPage.getProductByName(defaultProduct).should("be.visible");
    cartPage.getProductByName(secondProduct).should("be.visible");
    cartPage.clickCheckout();

    checkoutInformationPage.continueWithInformation({
      firstName,
      lastName,
      postalCode,
    });

    checkoutOverviewPage.getCartList().should('be.visible');
    checkoutOverviewPage.getProductByName(defaultProduct).should('be.visible');
    checkoutOverviewPage.getProductByName(secondProduct).should('be.visible');
    checkoutOverviewPage.getTotalLabel().should('contain.text', 'Total');

    checkoutOverviewPage.clickFinish();

    checkoutCompletePage
      .getCompleteHeader()
      .should('have.text', 'Thank you for your order!');

    checkoutCompletePage
      .getCompleteText()
      .should('contain.text', 'Your order has been dispatched');
  });

  it("should calculate the correct item total for multiple products on the checkout overview page", () => {
    let firstPrice = 0;
    let secondPrice = 0;

    inventoryPage.getProductPriceByName(defaultProduct).then(($price) => {
      firstPrice = parseFloat($price.text().replace("$", ""));
    });

    inventoryPage.getProductPriceByName(secondProduct).then(($price) => {
      secondPrice = parseFloat($price.text().replace("$", ""));
    });

    inventoryPage.addProductToCartByName(defaultProduct);
    inventoryPage.addProductToCartByName(secondProduct);
    inventoryPage.getCartBadge().should("have.text", "2");
    inventoryPage.openCart();

    cartPage.getProductByName(defaultProduct).should("be.visible");
    cartPage.getProductByName(secondProduct).should("be.visible");
    cartPage.clickCheckout();

    checkoutInformationPage.continueWithInformation({
      firstName,
      lastName,
      postalCode,
    });

    checkoutOverviewPage.getProductByName(defaultProduct).should("be.visible");
    checkoutOverviewPage.getProductByName(secondProduct).should("be.visible");

    checkoutOverviewPage.getSubtotalLabel().then(($subtotal) => {
      const subtotalText = $subtotal.text(); // pl. "Item total: $39.98"
      const actualSubtotal = parseFloat(subtotalText.replace("Item total: $", ""));
      const expectedSubtotal = firstPrice + secondPrice;

      expect(actualSubtotal).to.eq(expectedSubtotal);
    });
  });

  it('should show an error when first name is missing', () => {
    inventoryPage.addProductToCartByName(defaultProduct);
    inventoryPage.openCart();
    cartPage.clickCheckout();

    checkoutInformationPage.continueWithInformation({
      lastName,
      postalCode,
    });

    checkoutInformationPage
      .getErrorMessage()
      .should('have.text', 'Error: First Name is required');
  });

  it('should show an error when last name is missing', () => {
    inventoryPage.addProductToCartByName(defaultProduct);
    inventoryPage.openCart();
    cartPage.clickCheckout();

    checkoutInformationPage.continueWithInformation({
      firstName,
      postalCode,
    });
    
    checkoutInformationPage
      .getErrorMessage()
      .should('have.text', 'Error: Last Name is required');
  });

  it('should show an error when postal code is missing', () => {
    inventoryPage.addProductToCartByName(defaultProduct);
    inventoryPage.openCart();
    cartPage.clickCheckout();

    checkoutInformationPage.continueWithInformation({
      firstName,
      lastName,
    });

    checkoutInformationPage
      .getErrorMessage()
      .should('have.text', 'Error: Postal Code is required');
  });
});
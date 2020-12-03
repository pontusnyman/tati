//  Checkout Page Model
import { Selector, t } from 'testcafe';

class CheckoutPage {
  constructor() {
    this.firstNameInput = Selector('#first-name');
    this.lastNameInput = Selector('#last-name');
    this.postalCodeInput = Selector('#postal-code');
    this.continueButton = Selector('.cart_button');
    this.cartCancelButton = Selector('.cart_cancel_link');
    this.finishButton = Selector('.cart_button');
    this.checkoutCompleteHeader = Selector('.complete-header');
  }

  getCheckoutHeader() {
    return this.checkoutCompleteHeader;
  }

  /**
   *
   * @param {String} firstName
   * @param {String} lastName
   * @param {String} postalCode
   */
  async checkoutInformation(firstName = '', lastName = '', postalCode = '') {
    await t
      .typeText(this.firstNameInput, firstName)
      .typeText(this.lastNameInput, lastName)
      .typeText(this.postalCodeInput, postalCode);
  }

  async continueCheckout() {
    await t.click(this.continueButton);
  }

  async finishCheckout() {
    await t.click(this.finishButton);
  }
}

export default new CheckoutPage();

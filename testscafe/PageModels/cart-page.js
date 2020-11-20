// Cart Page Model
import { Selector, t } from 'testcafe';

class CartPage {
  constructor() {
    this.checkoutButton = Selector('.checkout_button');
  }

  async goToCheckout() {
    await t.click(this.checkoutButton);
  }
}

export default new CartPage();

// Common page elements & actions

import { Selector, t } from 'testcafe';

class PageCommons {
  constructor() {
    this.shoppingCartLink = Selector('.shopping_cart_link');
    this.shoppingCartBadge = Selector('.shopping_cart_badge');
    this.hamburgerMenuToggleButton = Selector('.bm-burger-button');
    this.logoutButton = Selector('#logout_sidebar_link');
  }

  getShoppingCartBadge() {
    return this.shoppingCartBadge;
  }

  async goToCartOverview() {
    await t.click(this.shoppingCartLink);
  }

  async toggleHamburgerMenu() {
    await t.click(this.hamburgerMenuToggleButton);
  }

  async logout() {
    await t.click(this.logoutButton);
  }
}

export default new PageCommons();

/* global fixture */

import PageCommons from './PageModels/page-commons';
import LoginPage from './PageModels/login-page';
import InventoryPage from './PageModels/inventory-page';
import CartPage from './PageModels/cart-page';
import CheckoutPage from './PageModels/checkout-page';

fixture`Lets go to SwagLabs and test`.page`https://www.saucedemo.com/`;

// // Run it and correect this test
test('Check the title', async (t) => {
  await t.expect(LoginPage.getTitle().innerText).eql('Swag Labs');
});
// Use the locked_out_user and check if you get a error msg
test('Attempt login as locked_out_user and check for error msg', async (t) => {
  await LoginPage.userLogin('locked_out_user');
  await t
    .expect(LoginPage.getErrorMessage().innerText)
    .eql('Epic sadface: Sorry, this user has been locked out.');
});
// Use problem_user and buy something, check if the cart is empyt after, and then logout
test('Buy something as problem_user, check if cart is empty, logout', async (t) => {
  await LoginPage.userLogin('problem_user');
  await InventoryPage.addProductToCart(4);
  await PageCommons.goToCartOverview();
  await CartPage.goToCheckout();
  await CheckoutPage.checkoutInformation('John', 'Doe', '123-3456');
  await CheckoutPage.continueCheckout();
  await CheckoutPage.finishCheckout();
  await t
    .expect(CheckoutPage.getCheckoutHeader().innerText)
    .eql('THANK YOU FOR YOUR ORDER');
  await t.expect(PageCommons.getShoppingCartBadge().innerText).notEql('1');
  await PageCommons.toggleHamburgerMenu();
  await PageCommons.logout();
});
// Use standard_user and buy a product, and then logout
test('Buy a product as standard_user and then logout', async (t) => {
  await LoginPage.userLogin('standard_user');
  await InventoryPage.addProductToCart(4);
  await PageCommons.goToCartOverview();
  await CartPage.goToCheckout();
  await CheckoutPage.checkoutInformation('David', 'Smith', '123-3456');
  await CheckoutPage.continueCheckout();
  await CheckoutPage.finishCheckout();
  await t
    .expect(CheckoutPage.getCheckoutHeader().innerText)
    .eql('THANK YOU FOR YOUR ORDER');
  await PageCommons.toggleHamburgerMenu();
  await PageCommons.logout();
  await t.expect(LoginPage.getTitle().innerText).eql('Swag Labs');
});
// BONUS: Use problem_user and see if all images render properly
test('As problem_user see if all images are correctly rendered', async (t) => {
  await LoginPage.userLogin('problem_user');
  const imageCount = await InventoryPage.getAllInventoryImgs().count;
  for (var i = 0; i < imageCount; i++) {
    await t
      .expect(InventoryPage.getAllInventoryImgs().nth(i).getAttribute('src'))
      .notContains('jpgWithGarbageOnItToBreakTheUrl', 'Image is broken');
  }
});

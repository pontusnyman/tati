/* global fixture */

import { Selector, ClientFunction } from 'testcafe'

fixture `Lets go to SwagLabs and test`
  .page `https://www.saucedemo.com/`


// Run it and correect this test
test('Check the title', async t => {
  await t.expect(Selector('title').innerText).eql('Swag Labs')
});
// Use the locked_out_user and check if you get a error msg
test('Log in with locked out user account', async t =>  {
  await t
    .typeText(Selector('#user-name'), 'locked_out_user')
    .typeText(Selector('#password'), 'secret_sauce')
    .click(Selector('#login-button'))
    .expect(Selector('[data-test="error"]')
      .innerText)
      .eql('Epic sadface: Username and password do not match any user in this service')
})
// Use problem_user and buy something, check if the cart is empyt after, and then logout
test('Lets shop and cart should get empty', async t =>  {
  await t
  .typeText(Selector('#user-name'), 'standard_user')
  .typeText(Selector('#password'), 'secret_sauce')
  .click(Selector('#login-button'))
  .click(Selector('.btn_primary'))
  .expect(Selector('.shopping_cart_badge').innerText).eql('1')
  .click(Selector('.shopping_cart_badge'))
  .click(Selector('.checkout_button'))
  .typeText(Selector('#first-name'), 'Brad')
  .typeText(Selector('#last-name'), 'Pitt')
  .typeText(Selector('#postal-code'), '25215 51')
  .click(Selector('.cart_button'))
  .click(Selector('.cart_button'))
  .expect(Selector('.complete-header').innerText).eql('THANK YOU FOR YOUR ORDER')
  .expect(Selector('.shopping_cart_badge').exists).notOk()
})
// Use standard_user and buy a product, and then logout
test('Log in with Standard and buy, log out', async t =>  {
  await t
  .typeText(Selector('#user-name'), 'standard_user')
  .typeText(Selector('#password'), 'secret_sauce')
  .click(Selector('#login-button'))
  .click(Selector('.btn_primary'))
  .expect(Selector('.shopping_cart_badge').innerText).eql('1')
  .click(Selector('.shopping_cart_badge'))
  .click(Selector('.checkout_button'))
  .typeText(Selector('#first-name'), 'Brad')
  .typeText(Selector('#last-name'), 'Pitt')
  .typeText(Selector('#postal-code'), '25215 51')
  .click(Selector('.cart_button'))
  .click(Selector('.cart_button'))
  .expect(Selector('.complete-header').innerText).eql('THANK YOU FOR YOUR ORDER')
  .expect(Selector('.shopping_cart_badge').exists).notOk()
  .click(Selector('.bm-burger-button'))
  .click(Selector('#logout_sidebar_link'))
  .expect(Selector('#user-name').exists).ok()
})
// Use problem_user and see if all images are visible
test('Log in with Standard and buy, log out', async t =>  {
  const images = Selector('img');
  let requestsCount = 0;
  const statuses = [];
  await t
  .typeText(Selector('#user-name'), 'problem_user')
  .typeText(Selector('#password'), 'secret_sauce')
  .click(Selector('#login-button'))

  const count = await images.count;

  const getRequestResult = ClientFunction(url => {
      return new Promise(resolve => {
          const xhr = new XMLHttpRequest();

          xhr.open('GET', url);

          xhr.onload = function () {
              resolve(xhr.status);
          };

          xhr.send(null);
      });
  });


  for (let i = 0; i < count; i++) {
      let url = await images.nth(i).getAttribute('src');

      if (!url.startsWith('data')) {
          requestsCount++;

          statuses.push(await getRequestResult(url));
      }
  }

  await t.expect(requestsCount).eql(statuses.length);

  for (let status of statuses)
      await t.expect(status).eql(200);
})
/* global fixture */

import { Selector } from 'testcafe'

fixture `Lets go to SwagLabs and test`
  .page `https://www.saucedemo.com/`


// Run it and correect this test
test('Check the title', async t => {
  await t.expect(Selector('title').innerText).eql('hi')
});

// Use the locked_out_user and check if you get a error msg
test.skip('', async t =>  {})
// Use problem_user and buy something, check if the cart is empyt after, and then logout
test.skip('', async t =>  {})
// Use standard_user and buy a product, and then logout
test.skip('', async t =>  {})
// BONUS: Use problem_user and see if all images render properly
test.skip('', async t =>  {})

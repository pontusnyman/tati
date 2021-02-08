/* global fixture */

import { Selector } from 'testcafe'

/* The fixture will go to the correct website
at the login page you will find all the different users and pw for 
the assigments, Good luck! */
fixture `Lets go to SwagLabs and test`
  .page `https://www.saucedemo.com/`

/* Run it and correect this test */
test('Check the title', async t => {
  await t.expect(Selector('title').innerText).eql('hi')
});

/* Use the locked_out_user and check if you get a error msg */
test.skip('', async t =>  {})

/* Login with problem_user
 and add the 'Sauce Labs Onesie' item to the cart,
 Go through the buy process,
 When the item is bought check if the cart is empty after,
 and then logout (HINT: test should fail) */
test.skip('', async t =>  {})

/* Login with standard_user
 change the sorting of products 
 to 'Price (Low to High)'
 verify if its correct */
test.skip('', async t =>  {})

/* Login with standard_user
 and add the 'Sauce Labs Onesie' item to the cart,
 Go through the buy process,
 When the item is bought check if the cart is empty after,
 and then logout */
test.skip('', async t =>  {})

/* BONUS 1: Use problem_user and see if all
images render properly. (Hint: test should fail */
test.skip('', async t =>  {})

/* BONUS 2: Use performance_glitch_user
and verify that the website have good performance.
(Hint: set a threshold, test should fail with
performance_glitch_user and it should succeed 
with standard_user */
test.skip('', async t =>  {})

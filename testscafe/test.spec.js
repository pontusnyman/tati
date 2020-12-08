/* global fixture */

import { Selector } from 'testcafe'

fixture `Lets go to SwagLabs and test`
  .page `https://www.saucedemo.com/`


// Run it and correct this test
test('Check the title', async t => {
  await t.expect(Selector('title').innerText).eql('Swag Labs')
  
});

// Use the locked_out_user and check if you get a error msg
test('Check error message with locked out user', async t =>  {
  const errorButtonExists = Selector('button.error-button').exists;
  //Log in with the locked out user
  await t
  .typeText('input#user-name.form_input', 'locked_out_user')
  .typeText('input#password.form_input', 'secret_sauce')
  .click('input#login-button.btn_action');
  //Check if error button exists
  await t.expect(errorButtonExists).ok('There is an error message displayed');
})

// Use problem_user and buy something, check if the cart is empyt after, and then logout
test('Problem user buy something, check empty cart', async t =>  {
//Log in with the problem user
await t
.typeText('input#user-name.form_input', 'problem_user')
.typeText('input#password.form_input', 'secret_sauce')
.click('input#login-button.btn_action');
//Buy something, click on the first "Add to cart" button
await t
.click(Selector('button.btn_primary.btn_inventory').nth(1));
//Check the cart if empty
/*if(await t.expect(Selector('div.shopping_cart_container a.shopping_cart_link.fa-layers.fa-fw > span.fa-layers-counter.shopping_cart_badge').exists).ok)
{
  console.log('The cart is not empty')
} else{
  console.log('The cart is empty')
};*/
await t.expect(Selector('div.shopping_cart_container a.shopping_cart_link.fa-layers.fa-fw > span.fa-layers-counter.shopping_cart_badge').exists).notOk('There should not be items in the cart when using the problem_user.')

//Log out
await t
.click(Selector('button').withText('Open Menu'))
.click(Selector('a').withText('Logout'));
})

// Use standard_user and buy a product, and then logout
test('Standard user buy product and logout', async t =>  {
//Log in with the standard user
await t
.typeText('input#user-name.form_input', 'standard_user')
.typeText('input#password.form_input', 'secret_sauce')
.click('input#login-button.btn_action');
//Buy something, click on the first "Add to cart" button
await t
.click(Selector('button.btn_primary.btn_inventory').nth(0));
//Check the cart is not empty
await t.expect(Selector('div.shopping_cart_container a.shopping_cart_link.fa-layers.fa-fw > span.fa-layers-counter.shopping_cart_badge').exists).ok('There should be items in the cart.');
//Log out
await t
.click(Selector('button').withText('Open Menu'))
.click(Selector('a').withText('Logout'));
})

// BONUS: Use problem_user and see if all images render properly
test('Problem user, verify pictures are rendered properly', async t =>  {
//Log in with the problem user
await t
.typeText('input#user-name.form_input', 'problem_user')
.typeText('input#password.form_input', 'secret_sauce')
.click('input#login-button.btn_action');
//Check if the pictures are rendered properly
var images = Selector('img.inventory_item_img');
var imageCount = await images.count;
var badImageCount = 0;
for(let i=0;i<imageCount;i++)
{
  var url = await images.nth(i).getAttribute('src');
  if(url.endsWith('jpgWithGarbageOnItToBreakTheUrl')) 
  {
    badImageCount++;
  }
}
await t.expect(badImageCount).eql(0, 'There are '+badImageCount+' not loaded images out of '+imageCount+' on the page.');
})

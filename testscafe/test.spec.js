/* global fixture */

import { Selector } from 'testcafe'



//------Locators--->LOGIN PAGE-----------------------------------------------------------
const userName = Selector('#user-name');
const userPassword = Selector('#password')
const loginBtn = Selector('#login-button')
//----------------------------------------------------------------------------------------


fixture `Lets go to SwagLabs and test`
  .page `https://www.saucedemo.com/`


//------TEST-CASE-1--> Check the title----------------------------------------------------
// Run it and correect this test
//----------------------------------------------------------------------------------------
test('TEST-CASE-1->Check the title\n-----------------------------------------------------------------------------', async t => {
  await t
  .expect(Selector('title').innerText).eql('Swag Labs')
  console.log("-----------------------------------------------------------------------------")
  console.log("TEST-CASE-1--> Check the title -->RESULT-->PASS")
  console.log("-----------------------------------------------------------------------------")
  console.log("Expected Result--> Title should be equal to 'Swag Labs'")
  console.log("Actual Result---> Title equals to 'Swag Labs'")
  console.log("-----------------------------------------------------------------------------") 
});
//----------END TEST-CASE-1--> Check the title -------------------------------------------



//------TEST-CASE-2--> Check locket_out_user and Get error msg----------------------------
// Use the locked_out_user and check if you get a error msg
//----------------------------------------------------------------------------------------
test('TEST-CASE-2->Check locket_out_user and Get error msg \n-----------------------------------------------------------------------------', async t =>  {
  await t
  .typeText(userName, 'locked_out_user', {speed:0.1})
  .typeText(userPassword, 'secret_sauce', {speed:0.1})
  .click(loginBtn)
  .expect(Selector('html').textContent).contains('Epic sadface: Sorry, this user has been locked out.');
  console.log("-----------------------------------------------------------------------------")
  console.log("TEST-CASE-2--> Check locket_out_user and Get error msg-->RESULT-->PASS")
  console.log("-----------------------------------------------------------------------------")
  console.log("Expected Result--> Error Message should be displayed with wrong credentials")
  console.log("Actual Result---> Error Message is displaying as per requirements")
  console.log("-----------------------------------------------------------------------------") 
});
//------END TEST-CASE-2--> Check locket_out_user and Get error msg-------------------------



// Use problem_user and buy something, check if the cart is empyt after, and then logout
test.skip('', async t =>  {})
// Use standard_user and buy a product, and then logout
test.skip('', async t =>  {})
// BONUS: Use problem_user and see if all images render properly
test.skip('', async t =>  {})

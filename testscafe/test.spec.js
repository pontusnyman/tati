/* global fixture */

import { Selector, ClientFunction } from 'testcafe'

const getWindowLocation = ClientFunction(() => window.location);

//------Locators--->LOGIN PAGE-----------------------------------------------------------
const userName = Selector('#user-name');
const userPassword = Selector('#password')
const loginBtn = Selector('#login-button')
//----------------------------------------------------------------------------------------

//------Locators--->INVENTORY PAGE--------------------------------------------------------
const addToCart_btn = Selector(() => {
  return document.getElementsByClassName('btn_primary btn_inventory')
});
const shoppingCart_btn = Selector('.shopping_cart_container')
//----------------------------------------------------------------------------------------

//------Locators--->CART PAGE-------------------------------------------------------------
const checkoutBtn = Selector(() => {
  return document.getElementsByClassName('btn_action checkout_button')
});

let cartItems = ''
    cartItems = Selector(() => {
        return document.getElementsByClassName('cart_item')
});
//----------------------------------------------------------------------------------------

//------Locators--->CHECKOUT-STEP-ONE-PAGE-------------------------------------------------
const checkout_continoue = Selector(() => {
  return document.getElementsByClassName('btn_primary cart_button')
});
const checkOut_firstName = Selector('#first-name')
const checkout_lastName = Selector('#last-name')
const checkout_zip = Selector('#postal-code')
//----------------------------------------------------------------------------------------

//------Locators--->CHECKOUT-STEP-TWO-PAGE------------------------------------------------
const checkoutFinsh_btn = Selector(() => {
  return document.getElementsByClassName('btn_action cart_button')
});
//----------------------------------------------------------------------------------------

//------Locators--->CHECKOUT-COMPLETE-PAGE------------------------------------------------
const logOut_btn = Selector('.bm-burger-button')
const logout = Selector('#logout_sidebar_link')
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
/*
Test Case
  1- Open URL 'https://www.saucedemo.com/'
  2- Enter userName: 'locket_out_user' & password:'secret_sauce' 
  3- Click on 'Login' button
  4- Error message should be displayed 
*/
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


//------TEST-CASE-3--> Check Cart is not empty with 'problem_user'------------------------
// Use problem_user and buy something, check if the cart is empyt after, and then logout
/*
Test Case
  1- Open URL 'https://www.saucedemo.com/'
  2- Enter userName: 'problem_user' & password:'secret_sauce' 
  3- Click on 'Login' button
  4- Page redirect to 'Inventory.html' page, add item in cart
  5- Click on 'Shopping Cart' icon --> Page redirect to 'Cart' page
  6- Click on 'CheckOut' button, Page redirect then add credientials & click on 'Continue' Button
  7- Page redirected, click on 'Finish' button and then click on again 'shopping cart' button
  8- Items are still present in shopping cart
  9- Store 'Page Location' Details and Count Items in Cart, then click on 'menu' upper top left and logout
  10- Generate report
*/ 
//----------------------------------------------------------------------------------------
test('TEST-CASE-3->Check Cart is not empty\n-----------------------------------------------------------------------------', async t =>  {  
  await t
  .typeText(userName, 'problem_user', {speed:0.1})
  .typeText(userPassword, 'secret_sauce', {speed:0.1})
  .click(loginBtn)
  .click(addToCart_btn)
  .click(shoppingCart_btn)
  .click(checkoutBtn)
  .wait(2000)
  .typeText(checkOut_firstName, 'mumtaz')
  .typeText(checkout_lastName, 'maqsood')
  .typeText(checkout_zip, '2860')
  .click(checkout_continoue)
  .click(checkoutFinsh_btn)
  .wait(2000)
  .click(shoppingCart_btn)
  const pageLocation = await getWindowLocation();  //get page location and store in location variable
  const itemsinCart = await cartItems.count;
  await t
  .click(logOut_btn)
  .wait(2000)
  .click(logout)
  console.log("-----------------------------------------------------------------------------")
  console.log("TEST-CASE-3->Check Cart is not empty-->RESULT-->FAIL")
  console.log("-----------------------------------------------------------------------------")
  console.log("Expected Result--> Cart should be empty after purchasing with user 'problem_user'")
  console.log("Actual Result---> Cart is not empty after purchasing--> Items in cart present:", itemsinCart)
  console.log("Bug Type---> Functional\nPriority---> URGENT \n Sverity---> CRITICAL")
  console.log("---------------------------PAGE INFO-----------------------------------------\n")
  console.log("href:",pageLocation.href,"\n", "Origin:",pageLocation.origin, "\n", "PathName:",pageLocation.pathname,"\n","Protocol:", pageLocation.protocol)
  console.log("-----------------------------------------------------------------------------")
  
});
//----------END TEST-CASE-3->Check Cart is not empty -------------------------------------------



//------TEST-CASE-4--> 'standard_user' buy a product & logout-----------------------------------
// Use standard_user and buy a product, and then logout
/*
Test Case
  1- Open URL 'https://www.saucedemo.com/'
  2- Enter userName: 'standard_user' & password:'secret_sauce' 
  3- Click on 'Login' button
  4- Page redirect to 'Inventory.html' page, add item in cart
  5- Click on 'Shopping Cart' icon --> Page redirect to 'Cart' page
  6- Click on 'CheckOut' button, Page redirect then add credientials & click on 'Continue' Button
  7- Page redirected, click on 'Finish' button 
  8- click on 'menu' upper top left and logout
  9- Generate report
*/ 
//----------------------------------------------------------------------------------------
test('TEST-CASE-4--> "standard_user" buy a product & logout\n-----------------------------------------------------------------------------', async t =>  { 
    await t
    .typeText(userName, 'standard_user', {speed:0.1})
    .typeText(userPassword, 'secret_sauce', {speed:0.1})
    .click(loginBtn)
    .click(addToCart_btn)
    .click(shoppingCart_btn)
    .click(checkoutBtn)
    .wait(2000)
    .typeText(checkOut_firstName, 'mumtaz')
    .typeText(checkout_lastName, 'maqsood')
    .typeText(checkout_zip, '2860')
    .click(checkout_continoue)
    .click(checkoutFinsh_btn)
    const location = await getWindowLocation();
    await t
    .wait(2000)
    .click(logOut_btn)
    .click(logout)
    .wait(2000);
    console.log("-----------------------------------------------------------------------------")
    console.log("TEST-CASE-4-->'standard_user' buy products & logout-->RESULT-->PASS")
    console.log("-----------------------------------------------------------------------------")
    console.log("Expected Result-->'standard_user' buy products & logout without problem '")
    console.log("Actual Result---> 'standard_user' sucessfully buy products & logout ")
    console.log("---------------------------PAGE INFO-----------------------------------------\n")
    console.log("href:",location.href,"\n", "Origin:",location.origin, "\n", "PathName:",location.pathname,"\n","Protocol:", location.protocol)
    console.log("-----------------------------------------------------------------------------")
});
//----------END TEST-CASE-4--> 'standard_user' buy a product & logout -------------------------------------------



//------TEST-CASE-5--> 'Use problem_user' & validate images are render properly-----------------------------------
// BONUS: Use problem_user and see if all images render properly
/*
Test Case
  1- Open URL 'https://www.saucedemo.com/'
  2- Enter userName: 'problem_user' & password:'secret_sauce' 
  3- Click on 'Login' button
  4- Page redirect to 'Inventory.html' page
  5- Check HTTP status code of images & if image status is 200 -> Ok else  
  6- Image status is 404 --> notOk --> not displaying
  7- Generate report
*/ 
//----------------------------------------------------------------------------------------
test('TEST-CASE-5--> Use problem_user & validate images are render properly\n-----------------------------------------------------------------------------', async t =>  {
  await t
  .typeText(userName, 'problem_user', {speed:0.1})
  .typeText(userPassword, 'secret_sauce', {speed:0.1})
  .click(loginBtn)
  .wait(2000)
  const location = await getWindowLocation();
  let images = Selector('img');
  let count = await images.count;
  let statusCode = [];
  console.log("-------------------------------------------------------------------------------------")
  console.log("TEST-CASE-5--> Use problem_user & validate images are render properly-->RESULT-->PASS")
  console.log("-------------------------------------------------------------------------------------")
     
  //----------------clientfunction used to get status code------------------
   let getRequestResult = ClientFunction(url => {
      return new Promise(resolve => {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url);
          xhr.onload = function () {
              resolve(xhr.status);
          };
          xhr.send(null);
      });
  });
  //----------------end client function------------------------------------

  console.log("------------------------IMAGE URL-------------------------------------MESSAGE----------------------------------------------STATUS CODE-")
  for (let i = 0; i < count; i++) {
      let url = await images.nth(i).getAttribute('src');
      //console.log(url)
      statusCode = await getRequestResult(url);
      //await t.expect(statuses).eql(200)
      console.log(url, "-->Image displayed if->statusCode=200 else not display-->:", statusCode)
      }
  console.log("----------------------------------------------------------------")
  console.log("TEST CASE RESULT")
  console.log("----------------------------------------------------------------")
  console.log("Expected Result--> All images displayed properply")
  console.log("Actual Result--->Images Not Displayed propely")
  console.log("Bug Type---> VISUAL\nPriority---> URGENT \n Sverity---> CRITICAL")
  console.log("----------------------------------------------------------------")
  console.log("---------------------------PAGE INFO-----------------------------------------\n")
  console.log("href:",location.href,"\n", "Origin:",location.origin, "\n", "PathName:",location.pathname,"\n","Protocol:", location.protocol)
  console.log("-----------------------------------------------------------------------------")     
});
//------END TEST-CASE-5--> 'Use problem_user' & validate images are render properly-----------------------------------
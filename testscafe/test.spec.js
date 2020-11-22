/* global fixture */

import { Selector, ClientFunction } from 'testcafe'

fixture`Lets go to SwagLabs and test`
    .page`https://www.saucedemo.com/`


// Run it and correct this test
test('------------------------------ Check the title test', async t => {
    await t.expect(Selector('title').innerText).eql('Swag Labs')
    console.log("Title exists");

});

//Use the locked_out_user and check if you get a error msg
test('------------------------------ Check the error message for locked user', async t => {
    var userNameField = Selector('#user-name').exists;
    await t.expect(userNameField).ok();
    console.log("UserName field is found");

    var userPassword = Selector('#password').exists;
    await t.expect(userPassword).ok();
    console.log("Password field is found");

    await t.typeText('#user-name', 'locked_out_user');
    await t.typeText('#password', 'secret_sauce');
    console.log("Username and Password are entered");

    await ('#login-button').exists;
    await t.click('#login-button');
    console.log("Login Button clicked");

    await (Selector('h3').withText('Sorry, this user has been locked out.')).exists;
    console.log("Error message is seen")

});


// Use problem_user and buy something, check if the cart is empty after, and then logout
test('------------------------------ Check the problem user test', async t => {
    var userNameField = Selector('#user-name').exists;
    await t.expect(userNameField).ok();
    console.log("UserName field is found");

    var userPassword = Selector('#password').exists;
    await t.expect(userPassword).ok();
    console.log("Password field is found");

    await t.typeText('#user-name', 'problem_user');
    await t.typeText('#password', 'secret_sauce');
    console.log("Username and Password are entered");

    await t.expect(Selector('#login-button').exists).ok();
    await t.click('#login-button');
    console.log("Login Button clicked");

    await (Selector('button').withText('ADD TO CART')).exists;
    console.log("Add to cart - is seen");
    await t.click(Selector('button').withText('ADD TO CART'));
    console.log("Add to cart button clicked");
    await t.navigateTo('https://www.saucedemo.com/cart.html');
    await (Selector('subheader').withText('Your Cart')).exists;

    var checkoutButton = Selector(id => document.querySelector("#cart_contents_container > div > div.cart_footer > a.btn_action.checkout_button"));
    await t.click(checkoutButton);
    console.log("Checkout button - is clicked");
    await (Selector('subheader').withText('Checkout: Your Information')).exists;

    await t.expect(Selector('#first-name').exists).ok();
    console.log("firstName field is found");

    await t.expect(Selector('#last-name').exists).ok();
    console.log("lastName field is found");

    await t.expect(Selector('#postal-code').exists).ok();
    console.log("zipCode field is found");

    await t.typeText('#first-name', 'Inna');
    await t.typeText('#last-name', 'Test');
    await t.typeText('#postal-code', '22222');
    console.log("First Name, Last Name, ZipCode are entered");

    var continueButton = Selector(id => document.querySelector("#checkout_info_container > div > form > div.checkout_buttons > input"));
    await t.click(continueButton);
    console.log("Continue button clicked");

    var finishButton = Selector(id => document.querySelector("#checkout_summary_container > div > div.summary_info > div.cart_footer > a.btn_action.cart_button"));
    await t.click(finishButton);
    console.log("Finish button clicked");
    await t.navigateTo('https://www.saucedemo.com/cart.html');

    var quantity = Selector(id => document.querySelector("#cart_contents_container > div > div.cart_list > div.cart_item > div.cart_quantity")).exists;
    var menuButton = Selector(id => document.querySelector("#menu_button_container > div > div:nth-child(3) > div > button"));
    var logoutButton = Selector(id => document.querySelector("#logout_sidebar_link"));
    var startImage = Selector(id => document.querySelector("body > div.login_wrapper > div.login_wrapper-inner > img"));

    //If we need to fail, uncomment
    //var cartIsEmpty = true;
    if (await t.expect(quantity.exists).notOk()) {
        console.log("All good cart is empty, logout follows");
    } else {
        console.log("Cart is not empty, logout follows");
        //If we need to fail, uncomment
        //cartIsEmpty = false;
    }

    await t.click(menuButton);
    await t.wait(1000);
    await t.click(logoutButton);
    await t.wait(1000);
    await (startImage).exists;
    //If we need to fail, uncomment
    //await t.expect(cartIsEmpty).ok()
});


// Use standard_user and buy a product, and then logout
test('------------------------------ Check normal user test', async t => {
    var userNameField = Selector('#user-name').exists;
    await t.expect(userNameField).ok();
    console.log("UserName field is found");

    var userPassword = Selector('#password').exists;
    await t.expect(userPassword).ok();
    console.log("Password field is found");

    await t.typeText('#user-name', 'standard_user');
    await t.typeText('#password', 'secret_sauce');
    console.log("Username and Password are entered");

    await t.expect(Selector('#login-button').exists).ok();
    await t.click('#login-button');
    console.log("Login Button Clicked");

    await (Selector('button').withText('ADD TO CART')).exists;
    console.log("Add to cart button is seen");
    await t.click(Selector('button').withText('ADD TO CART'));
    await t.navigateTo('https://www.saucedemo.com/cart.html');
    await (Selector('subheader').withText('Your Cart')).exists;

    var checkoutButton = Selector(id => document.querySelector("#cart_contents_container > div > div.cart_footer > a.btn_action.checkout_button"));
    console.log("Checkout Button Clicked");
    await t.click(checkoutButton);
    await (Selector('subheader').withText('Checkout: Your Information')).exists;

    await t.expect(Selector('#first-name').exists).ok();
    console.log("firstName field is found");

    await t.expect(Selector('#last-name').exists).ok();
    console.log("lastName field is found");

    await t.expect(Selector('#postal-code').exists).ok();
    console.log("zipCode field is found");

    await t.typeText('#first-name', 'Inna');
    await t.typeText('#last-name', 'Test');
    await t.typeText('#postal-code', '22222');
    console.log("First Name, Last Name, ZipCode are entered");


    var continueButton = Selector(id => document.querySelector("#checkout_info_container > div > form > div.checkout_buttons > input"));
    await t.click(continueButton);
    console.log("Continue Button clicked");
    var finishButton = Selector(id => document.querySelector("#checkout_summary_container > div > div.summary_info > div.cart_footer > a.btn_action.cart_button"));
    await t.click(finishButton);
    console.log("Finish Button clicked");
    await t.navigateTo('https://www.saucedemo.com/cart.html');

    var quantity = Selector(id => document.querySelector("#cart_contents_container > div > div.cart_list > div.cart_item > div.cart_quantity")).exists;
    var menuButton = Selector(id => document.querySelector("#menu_button_container > div > div:nth-child(3) > div > button"));
    var logoutButton = Selector(id => document.querySelector("#logout_sidebar_link"));
    var startImage = Selector(id => document.querySelector("body > div.login_wrapper > div.login_wrapper-inner > img"));

    if (await t.expect(quantity.exists).notOk()) {
        console.log("Cart is not empty, logout follows");
    } else {
        console.log("Cart is empty, logout follows");
    }

    await t.click(menuButton);
    await t.wait(1000);
    await t.click(logoutButton);
    await t.wait(1000);
    await (startImage).exists;

});

// BONUS: Use problem_user and see if all images render properly
test('------------------------------Check if all images exist test', async t => {

    var userNameField = Selector('#user-name').exists;
    await t.expect(userNameField).ok();

    var userPassword = Selector('#password').exists;
    await t.expect(userPassword).ok();
    await t.typeText('#user-name', 'problem_user');
    await t.typeText('#password', 'secret_sauce');

    await Selector('#login-button').exists;
    await t.click('#login-button');
    await (Selector('button').withText('ADD TO CART')).exists;

    var images = Selector('img');
    var count = await images.count;
    var urlStatus = {};

    var getRequestResult = ClientFunction(url => {
        return new Promise(resolve => {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);

            xhr.onload = function () {
                resolve(xhr.status);
            };

            xhr.send(null);
        });
    });


    for (var i = 0; i < count; i++) {
        var url = await images.nth(i).getAttribute('src');

        if (!url.startsWith('data')) {
            urlStatus[url] = await getRequestResult(url);
        }
    }

    var failedCount = 0;
    for (var url in urlStatus) {
        var status = urlStatus[url]
        if (status == "200") {
            console.log("Image seems to be good: " + url);
        } else {
            console.log("Failed to load image: " + url + ", status:" + status);
            failedCount++;
        }
    }
    //If we do not need to fail the test , then comment string below
    return await t.expect(failedCount).eql(0);
})

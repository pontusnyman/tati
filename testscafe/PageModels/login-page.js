//  Login Page Model
import { Selector, t } from 'testcafe';

class LoginPage {
  constructor() {
    this.title = Selector('title');
    this.usernameInput = Selector('#user-name');
    this.passwordInput = Selector('#password');
    this.loginButton = Selector('#login-button');
    this.errorMessage = Selector('h3').withAttribute('data-test', 'error');
  }

  getTitle() {
    return this.title;
  }

  /**
   *
   * @param {String} username
   * @param {String} password
   */
  async userLogin(username = '', password = 'secret_sauce') {
    await t
      .typeText(this.usernameInput, username)
      .typeText(this.passwordInput, password)
      .click(this.loginButton);
  }

  getErrorMessage() {
    return this.errorMessage;
  }
}

export default new LoginPage();

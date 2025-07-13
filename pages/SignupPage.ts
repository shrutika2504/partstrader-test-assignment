import { Page, Locator, expect } from '@playwright/test';
import { SignupInfoData } from '../data/SignupInfoData';

/**
 * Page Object Model for the Signup page.
 * Handles user signup form filling, submission, and verification of account creation.
 */

export class SignupPage {
  private readonly page: Page;
  private readonly nameInput: Locator;
  private readonly emailInput: Locator;
  private readonly signupButton: Locator;
  private readonly accountInfoText: Locator;
  private readonly createAccountButton: Locator;
  private readonly accountCreatedText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('input[name="name"]');
    this.emailInput = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');
    this.accountInfoText = page.locator('text=ENTER ACCOUNT INFORMATION');
    this.createAccountButton = page.locator('button[data-qa="create-account"]');
    this.accountCreatedText = page.locator('text=ACCOUNT CREATED!');
  }

  async verifyNewUserSignUp() {
    await expect(this.page.locator('text=New User SignUp')).toBeVisible();
  }

  async enterNameAndEmail(data: SignupInfoData) {
    await this.nameInput.fill(data.fname);
    await this.emailInput.fill(data.email);
  }

  async clickSignupButton() {
    await this.signupButton.click();
  }

  async verifyAccountInformation() {
    await expect(this.accountInfoText).toBeVisible();
  }

  async fillAccountDetails(details: {
    name: string;
    password: string;
    dob: { day: string; month: string; year: string };
    firstName: string;
    lastName: string;
    company: string;
    address: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
  }) {
    await this.page.check('input[id="id_gender1"]');
    await this.nameInput.fill(details.name);
    await this.page.fill('input[name="password"]', details.password);

    await this.page.locator('#days').selectOption(details.dob.day);
    await this.page.locator('#months').selectOption(details.dob.month);
    await this.page.locator('#years').selectOption(details.dob.year);

    await this.page.check('input[name="newsletter"]');
    await this.page.check('input[name="optin"]');

    await this.page.fill('input[name="first_name"]', details.firstName);
    await this.page.fill('input[name="last_name"]', details.lastName);
    await this.page.fill('input[name="company"]', details.company);
    await this.page.fill('input[name="address1"]', details.address);
    await this.page.fill('input[name="address2"]', details.address2);
    await this.page.locator('#country').selectOption(details.country);
    await this.page.fill('input[name="state"]', details.state);
    await this.page.fill('input[name="city"]', details.city);
    await this.page.fill('input[name="zipcode"]', details.zipcode);
    await this.page.fill('input[name="mobile_number"]', details.mobileNumber);
  }

  async clickCreateAccountButton() {
    await this.createAccountButton.click();
  }

  async verifyAccountCreated() {
    await expect(this.accountCreatedText).toBeVisible();
  }
}

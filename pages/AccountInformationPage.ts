import { Page, expect, Locator } from '@playwright/test';
import { SignupInfoData } from '../data/SignupInfoData';

/**
 * Page Object Model for the Account Information page.
 * Handles form filling, validation, and navigation during user signup.
 *
 * Usage:
 * - Fill account details
 * - Submit the form
 * - Verify account creation
 */

export class AccountInformationPage {
  private readonly enterAccountInfoText: Locator;
  private readonly titleMrRadio: Locator;
  private readonly nameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly daySelect: Locator;
  private readonly monthSelect: Locator;
  private readonly yearSelect: Locator;
  private readonly newsletterCheckbox: Locator;
  private readonly optinCheckbox: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly companyInput: Locator;
  private readonly address1Input: Locator;
  private readonly address2Input: Locator;
  private readonly countrySelect: Locator;
  private readonly stateInput: Locator;
  private readonly cityInput: Locator;
  private readonly zipcodeInput: Locator;
  private readonly mobileNumberInput: Locator;
  private readonly createAccountButton: Locator;
  private readonly accountCreatedText: Locator;
  private readonly continueButton: Locator;

  constructor(private readonly page: Page) {
    this.enterAccountInfoText = page.locator('text=ENTER ACCOUNT INFORMATION');
    this.titleMrRadio = page.locator('input[type="radio"][value="Mr"]');
    this.nameInput = page.locator('#name');
    this.passwordInput = page.locator('#password');
    this.daySelect = page.locator('#days');
    this.monthSelect = page.locator('#months');
    this.yearSelect = page.locator('#years');
    this.newsletterCheckbox = page.locator('input[name="newsletter"]');
    this.optinCheckbox = page.locator('input[name="optin"]');
    this.firstNameInput = page.locator('#first_name');
    this.lastNameInput = page.locator('#last_name');
    this.companyInput = page.locator('#company');
    this.address1Input = page.locator('#address1');
    this.address2Input = page.locator('#address2');
    this.countrySelect = page.locator('#country');
    this.stateInput = page.locator('#state');
    this.cityInput = page.locator('#city');
    this.zipcodeInput = page.locator('#zipcode');
    this.mobileNumberInput = page.locator('#mobile_number');
    this.createAccountButton = page.locator('button[data-qa="create-account"]');
    this.accountCreatedText = page.locator('text=ACCOUNT CREATED!');
    this.continueButton = page.locator('[data-qa="continue-button"]');
  }

  private async expectVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  async verifyAccountInformation() {
    await this.expectVisible(this.enterAccountInfoText);
  }

  async fillAccountDetails(data: SignupInfoData) {
    await this.titleMrRadio.check();
    await this.nameInput.fill(data.fname);
    await this.passwordInput.fill(data.password);

    await this.daySelect.selectOption(data.day);
    await this.monthSelect.selectOption(data.month);
    await this.yearSelect.selectOption(data.year);

    await this.newsletterCheckbox.check();
    await this.optinCheckbox.check();

    await this.firstNameInput.fill(data.fname);
    await this.lastNameInput.fill(data.lname);
    await this.companyInput.fill(data.company);

    await this.address1Input.fill(data.address1);
    await this.address2Input.fill(data.address2);
    await this.countrySelect.selectOption(data.country);

    await this.stateInput.fill(data.state);
    await this.cityInput.fill(data.city);
    await this.zipcodeInput.fill(data.zipcode);
    await this.mobileNumberInput.fill(data.mobileNumber);
  }

  async clickCreateAccountButton() {
    await this.createAccountButton.click();
  }

  async verifyAccountCreated() {
    await this.expectVisible(this.accountCreatedText);
  }

  async clickContinueButton() {
    await this.continueButton.click();
  }
}

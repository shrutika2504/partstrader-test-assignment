import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for the Home page.
 * Handles navigation and verification using the navigation bar.
 */

export class LoginPage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly loginToAccountText: Locator;
  private readonly loginFailureText: Locator;

  constructor(private readonly page: Page) {
    this.emailInput = page.locator('input[data-qa="login-email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
    this.loginToAccountText = page.locator('text=Login to your account');
    this.loginFailureText = page.locator('text=Your email or password is');
  }

  /** Fill login form and submit */
  async enterLoginDetails(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /** Verify presence of login page text */
  async verifyLoginPageVisible(): Promise<void> {
    await expect(this.loginToAccountText).toBeVisible();
  }

  /** Verify login failure message is visible */
  async verifyLoginFailure(): Promise<void> {
    await expect(this.loginFailureText).toBeVisible();
  }

  /** Verify login success with username displayed */
  async verifyLoginSuccess(username: string): Promise<void> {
    const loggedInText = await this.page.textContent(`text=Logged in as ${username}`);
    expect(loggedInText).toContain(`Logged in as ${username}`);
  }
}

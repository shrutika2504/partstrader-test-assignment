import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for the navigation bar.
 * Provides navigation actions and user-related verifications.
 */

export class NavigationBarPage {
  private readonly navLinks: Locator;
  private readonly homeLink: Locator;
  private readonly productsLink: Locator;
  private readonly cartLink: Locator;
  private readonly signupLoginLink: Locator;
  private readonly logoutLink: Locator;
  private readonly deleteAccountLink: Locator;
  private readonly loggedInUserText: Locator;

  constructor(private readonly page: Page) {
    this.navLinks = page.locator('ul.nav.navbar-nav');
    this.homeLink = this.navLinks.locator('text=Home');
    this.productsLink = this.navLinks.locator('text=Products');
    this.cartLink = this.navLinks.locator('text=Cart');
    this.signupLoginLink = this.navLinks.locator('text=Signup / Login');
    this.logoutLink = this.navLinks.locator('text=Logout');
    this.deleteAccountLink = this.navLinks.locator('text=Delete Account');
    this.loggedInUserText = this.navLinks.locator('text=Logged in as');
  }

  async goToHome(): Promise<void> {
    await this.homeLink.click();
  }

  async goToProducts(): Promise<void> {
    await this.productsLink.click();
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click({ force: true });
  }

  async signupOrLogin(): Promise<void> {
    await this.signupLoginLink.click();
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
  }

  async deleteAccount(): Promise<void> {
    await this.deleteAccountLink.click();
  }

  async expectLoggedInUser(username: string): Promise<void> {
    await expect(this.loggedInUserText).toContainText(`Logged in as ${username}`);
  }
}

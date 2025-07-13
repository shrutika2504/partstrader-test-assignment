import { Page, expect } from '@playwright/test';
import { NavigationBarPage } from '../pages/NavigationBarPage';

export class HomePage {
  private readonly navBar: NavigationBarPage;

  constructor(private readonly page: Page) {
    this.navBar = new NavigationBarPage(page);
  }

  /**
   * Navigates to the given URL.
   */
  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Verifies the home page title contains "Automation Exercise".
   */
  async verifyHomePage(): Promise<void> {
    await expect(this.page).toHaveTitle(/Automation Exercise/);
  }

  /**
   * Navigates to the signup/login page via the navbar.
   */
  async clickSignupLogin(): Promise<void> {
    await this.navBar.signupOrLogin();
  }

  /**
   * Navigates to the Home page via the navbar.
   */
  async clickHome(): Promise<void> {
    await this.navBar.goToHome();
  }

  /**
   * Navigates to the products page via the navbar.
   */
  async goToProducts(): Promise<void> {
    await this.navBar.goToProducts();
  }

  /**
   * Navigates to the cart via the navbar.
   */
  async clickCartButton(): Promise<void> {
    await this.navBar.goToCart();
  }

  /**
   * Clicks "Delete Account" in the navbar.
   */
  async deleteAccount(): Promise<void> {
    await this.navBar.deleteAccount();
  }

  /**
   * Clicks "Log Out Account" in the navbar.
   */
  async logOutAccount(): Promise<void> {
    await this.navBar.logout();
  }

  /**
   * Verify "LoggedIn UserDetails" in the navbar.
   */
  async verifyLoggedInUserDetails(username: string): Promise<void> {
    await this.navBar.expectLoggedInUser(username);
  }
}

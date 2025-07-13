import { Page, Locator } from '@playwright/test';

export class CheckoutModal {
  private readonly continueOnCartButton: Locator;
  private readonly registerOrLoginLink: Locator;

  constructor(private readonly page: Page) {
    this.continueOnCartButton = page.getByRole('link', {
      name: 'Continue On Cart',
    });
    this.registerOrLoginLink = page.locator('#checkoutModal a[href="/login"]');
  }

  async clickContinueOnCart(): Promise<void> {
    await this.continueOnCartButton.click();
  }

  async clickRegisterOrLogin(): Promise<void> {
    await this.registerOrLoginLink.click();
  }
}

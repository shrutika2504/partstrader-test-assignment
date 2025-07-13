import { Page, expect } from '@playwright/test';

/**
 * Page Object Model for the Order Confirmation page.
 * Verifies confirmation messages and handles post-order actions.
 */

export class OrderConfirmationPage {
  private readonly page: Page;
  private readonly confirmationMessage;
  private readonly orderPlacedHeading;
  private readonly continueButton;
  private readonly downloadInvoiceLink;

  constructor(page: Page) {
    this.page = page;
    this.confirmationMessage = page.locator('p', {
      hasText: 'Congratulations! Your order has been confirmed!',
    });
    this.orderPlacedHeading = page.locator('[data-qa="order-placed"]');
    this.continueButton = page.locator('[data-qa="continue-button"]');
    this.downloadInvoiceLink = page.locator('a.check_out', {
      hasText: 'Download Invoice',
    });
  }

  async verifyOrderConfirmationMessage(): Promise<void> {
    await expect(this.confirmationMessage).toBeVisible();
  }

  async verifyOrderConfirmationPageTitle(): Promise<void> {
    const headingText = (await this.orderPlacedHeading.innerText()).trim();
    expect(headingText).toBe('ORDER PLACED!');
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  async downloadInvoice(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.downloadInvoiceLink.click(),
    ]);
  }
}

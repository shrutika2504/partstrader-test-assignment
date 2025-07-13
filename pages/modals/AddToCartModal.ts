import { Page, Locator, expect } from '@playwright/test';

export class AddToCartModal {
  private readonly modal: Locator;
  private readonly title: Locator;
  private readonly confirmationText: Locator;
  private readonly viewCartLink: Locator;
  private readonly continueShoppingButton: Locator;

  constructor(private readonly page: Page) {
    this.modal = page.locator('.modal-dialog.modal-confirm');
    this.title = this.modal.locator('.modal-title');
    this.confirmationText = this.modal.locator('.modal-body', {
      hasText: 'Your product has been added to cart.',
    });
    this.viewCartLink = this.modal.locator('a', { hasText: 'View Cart' });
    this.continueShoppingButton = this.modal.locator('button', {
      hasText: 'Continue Shopping',
    });
  }

  async waitForVisible() {
    await expect(this.modal).toBeVisible();
  }

  async clickViewCart() {
    await this.viewCartLink.click();
  }

  async clickContinueShopping() {
    await this.continueShoppingButton.click();
    await expect(this.modal).toBeHidden();
  }
}

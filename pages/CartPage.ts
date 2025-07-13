import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for the Cart page.
 * Verifies product details in the cart and proceeds to checkout.
 */

export class CartPage {
  private readonly cartTableRows: Locator;
  private readonly proceedToCheckoutButton: Locator;

  constructor(private readonly page: Page) {
    this.cartTableRows = page.locator('#cart_info_table tbody tr');
    this.proceedToCheckoutButton = page.locator('a.check_out');
  }

  /**
   * Verifies that the cart contains a specific product with expected text.
   */
  async verifyCartContainsText(productName: string, expectedText: string): Promise<void> {
    const productRow = this.page.locator('#cart_info_table tbody tr', {
      hasText: productName,
    });
    await expect(productRow).toContainText(expectedText);
  }

  /**
   * Verifies quantity, unit price, and total price for a product at a specific row index.
   */
  async verifyProductInCart(
    productIndex: number,
    expectedQuantity: number,
    expectedPrice: string
  ): Promise<void> {
    const row = this.cartTableRows.nth(productIndex - 1);

    const priceText = await row.locator('.cart_price p').innerText();
    const priceFromUI = parseFloat(priceText.replace(/[^\d.]/g, ''));
    const expectedPriceNumber = parseFloat(expectedPrice.replace(/[^\d.]/g, ''));

    expect(priceFromUI).toBeCloseTo(expectedPriceNumber, 2);

    const quantityText = await row.locator('.cart_quantity button').innerText();
    expect(parseInt(quantityText)).toBe(expectedQuantity);

    const totalText = await row.locator('.cart_total p.cart_total_price').innerText();
    const totalFromUI = parseFloat(totalText.replace(/[^\d.]/g, ''));
    const expectedTotal = expectedPriceNumber * expectedQuantity;

    expect(totalFromUI).toBeCloseTo(expectedTotal, 2);
  }

  /**
   * Clicks the Proceed To Checkout button.
   */
  async clickProceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutButton.click();
  }
}

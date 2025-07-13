import { Page, expect, Locator } from '@playwright/test';

/**
 * Page Object Model for the Product page.
 * Provides product search and add-to-cart functionality.
 */

export class ProductPage {
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;

  constructor(private readonly page: Page) {
    this.searchInput = page.getByPlaceholder('Search Product');
    this.searchButton = page.locator('button#submit_search');
  }

  async searchProduct(productName: string): Promise<void> {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async addToCart(productName: string): Promise<void> {
    // Locate the product card by product name
    const productCard = this.page.locator('.single-products', {
      hasText: productName,
    });

    // Locate the always-visible "Add to cart" button
    const addToCartButton = productCard.locator('.productinfo a.add-to-cart');

    // Wait for button to be visible and click
    await expect(addToCartButton).toBeVisible({ timeout: 5000 });
    await addToCartButton.scrollIntoViewIfNeeded();
    await addToCartButton.click();

    // Wait for modal to appear
    const modal = this.page.locator('#cartModal');
    await expect(modal).toBeVisible({ timeout: 5000 });
  }
}

import { Page, expect, Locator } from '@playwright/test';
import { SignupInfoData } from '../data/SignupInfoData';

/**
 * Page Object Model for the Address Details page.
 * Verifies delivery/billing addresses, cart items, and total price.
 * Supports placing an order and adding comments.
 */

export class AddressDetailsPage {
  private readonly page: Page;

  private readonly deliverySection: Locator;
  private readonly billingSection: Locator;
  private readonly placeOrderButton: Locator;
  private readonly addressDetailsHeading: Locator;
  private readonly reviewOrderHeading: Locator;
  private readonly commentTextarea: Locator;
  private readonly cartTableRows: Locator;
  private readonly totalAmountLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.deliverySection = page.locator('#address_delivery');
    this.billingSection = page.locator('#address_invoice');
    this.placeOrderButton = page.getByRole('link', { name: 'Place Order' });
    this.addressDetailsHeading = page.getByRole('heading', {
      name: 'Address Details',
    });
    this.reviewOrderHeading = page.getByRole('heading', {
      name: 'Review Your Order',
    });
    this.commentTextarea = page.locator('textarea[name="message"]');
    this.cartTableRows = page.locator("#cart_info·table·tbody·tr[id^='product-']");
    this.totalAmountLocator = page
      .locator('#cart_info table tbody tr')
      .last()
      .locator('p.cart_total_price');
  }

  private async expectAddressDetails(section: Locator, title: string, data: SignupInfoData) {
    const fullname = `Mr. ${data.fname} ${data.lname}`;
    const addressLine3 = `${data.city} ${data.state} ${data.zipcode}`;

    await expect(section.locator('.address_title')).toHaveText(title);
    await expect(section.locator('.address_firstname.address_lastname')).toHaveText(fullname);
    await expect(section.locator('.address_address1.address_address2').nth(0)).toHaveText(
      data.company
    );
    await expect(section.locator('.address_address1.address_address2').nth(1)).toHaveText(
      data.address1
    );
    await expect(section.locator('.address_address1.address_address2').nth(2)).toHaveText(
      data.address2
    );
    await expect(section.locator('.address_city.address_state_name.address_postcode')).toHaveText(
      addressLine3
    );
    await expect(section.locator('.address_country_name')).toHaveText(data.country);
    await expect(section.locator('.address_phone')).toHaveText(data.mobileNumber);
  }

  async verifyDeliveryAddress(data: SignupInfoData) {
    await this.expectAddressDetails(this.deliverySection, 'Your delivery address', data);
  }

  async verifyBillingAddress(data: SignupInfoData) {
    await this.expectAddressDetails(this.billingSection, 'Your billing address', data);
  }

  async verifyCartContainsText(productName: string, expectedText: string) {
    const productLocator = this.page.locator('#cart_info table tbody tr', {
      hasText: productName,
    });
    await expect(productLocator).toContainText(expectedText);
  }

  async verifyProductInCart(productIndex: number, expectedQuantity: number, expectedPrice: string) {
    const row = this.page.locator('#cart_info tbody tr').nth(productIndex - 1);

    await row.waitFor({ state: 'visible' });

    // Price
    const priceLocator = row.locator('.cart_price p');
    await priceLocator.waitFor({ state: 'visible' });
    const priceText = (await priceLocator.innerText()).trim();
    const priceFromUI = parseFloat(priceText.replace(/[^\d.]/g, ''));
    const expectedPriceNumber = parseFloat(expectedPrice.replace(/[^\d.]/g, ''));
    expect(priceFromUI).toBeCloseTo(expectedPriceNumber, 2);

    // Quantity
    const quantityLocator = row.locator('.cart_quantity button');
    await quantityLocator.waitFor({ state: 'visible' });
    const quantityText = (await quantityLocator.innerText()).trim();
    expect(parseInt(quantityText)).toBe(expectedQuantity);

    // Total
    const totalLocator = row.locator('.cart_total_price');
    await totalLocator.waitFor({ state: 'visible' });
    const totalText = (await totalLocator.innerText()).trim();
    const totalFromUI = parseFloat(totalText.replace(/[^\d.]/g, ''));
    const expectedTotal = expectedPriceNumber * expectedQuantity;
    expect(totalFromUI).toBeCloseTo(expectedTotal, 2);
  }

  async verifyTotalAmount(expectedTotalAmount: string) {
    const totalAmountText = (await this.totalAmountLocator.innerText()).trim();
    const totalAmountFromUI = parseFloat(totalAmountText.replace(/[^\d.]/g, ''));
    const expectedAmountNumber = parseFloat(expectedTotalAmount.replace(/[^\d.]/g, ''));
    expect(totalAmountFromUI).toBeCloseTo(expectedAmountNumber, 2);
  }

  async clickPlaceOrderButton() {
    await this.placeOrderButton.click();
  }

  async verifyAddressDetailsHeading() {
    await expect(this.addressDetailsHeading).toBeVisible();
  }

  async verifyReviewOrderHeading() {
    await expect(this.reviewOrderHeading).toBeVisible();
  }

  async updateComment(comment: string = 'Order Placed.') {
    await this.commentTextarea.fill(comment);
  }
}

import { Page, expect } from '@playwright/test';
import { CreditCardData } from '../data/CreditCardData';

/**
 * Page Object Model for the Payments page.
 * Fills payment form and validates the payment process.
 */

export class PaymentsPage {
  private readonly page: Page;
  private readonly nameOnCardInput;
  private readonly cardNumberInput;
  private readonly cvcInput;
  private readonly expiryMonthInput;
  private readonly expiryYearInput;
  private readonly payButton;
  private readonly paymentHeading;

  constructor(page: Page) {
    this.page = page;
    this.nameOnCardInput = page.locator('[data-qa="name-on-card"]');
    this.cardNumberInput = page.locator('[data-qa="card-number"]');
    this.cvcInput = page.locator('[data-qa="cvc"]');
    this.expiryMonthInput = page.locator('[data-qa="expiry-month"]');
    this.expiryYearInput = page.locator('[data-qa="expiry-year"]');
    this.payButton = page.locator('[data-qa="pay-button"]');
    this.paymentHeading = page.getByRole('heading', { name: 'Payment' });
  }

  async fillPaymentFormAndValidateSuccess(data: CreditCardData): Promise<void> {
    await this.nameOnCardInput.fill(data.cardHolderName);
    await this.cardNumberInput.fill(data.cardNumber);
    await this.cvcInput.fill(data.cardCVV);
    await this.expiryMonthInput.fill(data.expiryMonth);
    await this.expiryYearInput.fill(data.expiryYear);
    await this.payButton.click();
  }

  async verifyPaymentHeading(): Promise<void> {
    await expect(this.paymentHeading).toBeVisible();
  }
}

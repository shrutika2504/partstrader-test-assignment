import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for the Account Deletion Confirmation page.
 * Verifies the deletion message and navigates using the Continue button.
 */

export class DeleteAccountConfirmationPage {
  private readonly accountDeletedMessage: Locator;
  private readonly continueButton: Locator;

  constructor(private readonly page: Page) {
    this.accountDeletedMessage = page.locator('[data-qa="account-deleted"]');
    this.continueButton = page.locator('[data-qa="continue-button"]');
  }

  /**
   * Verifies the account deletion confirmation message is visible and correct.
   */
  async verifyAccountDeletionMessage(): Promise<void> {
    await expect(this.accountDeletedMessage).toBeVisible();
    await expect(this.accountDeletedMessage).toHaveText('Account Deleted!');
  }

  /**
   * Clicks the "Continue" button after account deletion.
   */
  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
}

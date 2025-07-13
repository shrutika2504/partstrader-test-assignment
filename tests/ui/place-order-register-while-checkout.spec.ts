import { test } from '@playwright/test';
import { ENV } from '../../env';
import { HomePage } from '../../pages/HomePage';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';
import { SignupPage } from '../../pages/SignupPage';
import { AccountInformationPage } from '../../pages/AccountInformationPage';
import { SignupInfoData } from '../../data/SignupInfoData';
import { CreditCardData } from '../../data/CreditCardData';
import { AddressDetailsPage } from '../../pages/AddressDetailsPage';
import { PaymentsPage } from '../../pages/PaymentsPage';
import { OrderConfirmationPage } from '../../pages/OrderConfirmationPage';
import { DeleteAccountConfirmationPage } from '../../pages/DeleteAccountConfirmationPage';
import { AddToCartModal } from '../../pages/modals/AddToCartModal';
import { CheckoutModal } from '../../pages/modals/CheckoutModal';
import products from '../../data/productsdetails.json';

/**
 * Test Case 14: Place Order - Register While Checkout Flow
 * Steps:
 * - Add products to cart as guest
 * - Proceed to checkout and register on the checkout page
 * - Complete registration and login
 * - Proceed with checkout, verify addresses and cart
 * - Make payment and confirm order
 * - Delete account after test completion
 */

test.beforeEach(async ({ page }, testInfo) => {
  try {
    const response = await page.goto(ENV.baseUrl);
    if (!response?.ok()) {
      testInfo.skip(true, `Base URL is not reachable: ${response?.status()}`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    testInfo.skip(true, 'Base URL is not reachable (exception thrown)');
  }
});

test('Test Case 14: Place Order: Register while Checkout Flow', async ({ page }) => {
  // Page Object Instantiations
  const home = new HomePage(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);
  const signup = new SignupPage(page);
  const accountInfo = new AccountInformationPage(page);
  const address = new AddressDetailsPage(page);
  const payment = new PaymentsPage(page);
  const orderConfirm = new OrderConfirmationPage(page);
  const deleteAccount = new DeleteAccountConfirmationPage(page);
  const addToCartModal = new AddToCartModal(page);
  const checkoutModal = new CheckoutModal(page);

  const signupData = new SignupInfoData();
  const creditCardData = new CreditCardData();
  const name = signupData.fname;

  // Navigate and Add Products to Cart
  await home.navigate(ENV.baseUrl);
  await home.goToProducts();

  for (const item of products.products) {
    await product.searchProduct(item.productName);
    await product.addToCart(item.productName);
    await addToCartModal.clickContinueShopping();
  }

  // Cart Validation
  await home.clickCartButton();
  await verifyCartProducts(cart);
  await cart.clickProceedToCheckout();

  // Registration Flow
  await checkoutModal.clickRegisterOrLogin();
  await signup.enterNameAndEmail(signupData);
  await signup.clickSignupButton();
  await accountInfo.verifyAccountInformation();
  await accountInfo.fillAccountDetails(signupData);
  await accountInfo.clickCreateAccountButton();
  await accountInfo.verifyAccountCreated();
  await accountInfo.clickContinueButton();

  await home.verifyLoggedInUserDetails(name);

  // Proceed Checkout Again After Login
  await home.clickCartButton();
  await cart.clickProceedToCheckout();

  // Address & Product Verification
  await address.verifyAddressDetailsHeading();
  await address.verifyDeliveryAddress(signupData);
  await address.verifyBillingAddress(signupData);
  await verifyCartProducts(address);
  await address.verifyTotalAmount(products.expectedTotalAmount);
  await address.updateComment();
  await address.clickPlaceOrderButton();

  // Payment & Confirmation
  await payment.verifyPaymentHeading();
  await payment.fillPaymentFormAndValidateSuccess(creditCardData);
  await orderConfirm.verifyOrderConfirmationPageTitle();
  await orderConfirm.verifyOrderConfirmationMessage();
  await orderConfirm.clickContinue();

  // Account Deletion
  await home.deleteAccount();
  await deleteAccount.verifyAccountDeletionMessage();
  await deleteAccount.clickContinue();
});

// Helper Function to Reuse Product Verification Logic
async function verifyCartProducts(pageObject: CartPage | AddressDetailsPage) {
  for (const item of products.products) {
    await pageObject.verifyCartContainsText(item.productName, item.expectedName);
    await pageObject.verifyCartContainsText(item.productName, item.category);
    await pageObject.verifyProductInCart(
      item.productIndex,
      item.expectedQuantity,
      item.expectedPrice
    );
  }
}

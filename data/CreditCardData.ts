import { faker } from '@faker-js/faker';

export class CreditCardData {
  cardNumber: string;
  cardCVV: string;
  expiryMonth: string;
  expiryYear: string;
  cardHolderName: string;

  constructor() {
    // Generate a future expiry date up to 5 years from now
    const expiryDate = faker.date.future({ years: 5 });

    // Generate a realistic credit card number
    this.cardNumber = faker.finance.creditCardNumber();

    // Generate a 3-digit CVV code as string
    this.cardCVV = faker.string.numeric(3);

    // Format expiry month as 2-digit string (01-12)
    this.expiryMonth = (expiryDate.getMonth() + 1).toString().padStart(2, '0');

    // Expiry year as a 4-digit string (e.g., 2027)
    this.expiryYear = expiryDate.getFullYear().toString();

    // Generate a random full name for the cardholder
    this.cardHolderName = `${faker.person.firstName()} ${faker.person.lastName()}`;
  }
}

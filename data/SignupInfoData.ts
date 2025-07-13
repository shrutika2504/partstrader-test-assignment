import { ENV } from '../env';
import { faker } from '@faker-js/faker';

export class SignupInfoData {
  fname: string;
  lname: string;
  email: string;
  password: string;
  company: string;
  address1: string;
  address2: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
  day: string;
  month: string;
  year: string;
  country: string;

  constructor() {
    // Generate first and last name
    this.fname = faker.person.firstName();
    this.lname = faker.person.lastName();

    // Generate email
    this.email = faker.internet.email();

    // Password from environment config (for consistent test credentials)
    this.password = ENV.password;

    // Company name
    this.company = faker.company.name();

    // Address fields — building number and street address for better realism
    this.address1 = faker.location.buildingNumber();
    this.address2 = faker.location.streetAddress();

    // State, city, and zipcode
    this.state = faker.location.state();
    this.city = faker.location.city();
    this.zipcode = faker.location.zipCode();

    // Random phone number
    this.mobileNumber = faker.phone.number();

    // Date of birth:
    // - day as string (1-31)
    // - month as full name string
    // - year fixed 30 years ago from current year
    this.day = faker.date.anytime().getDate().toString();
    this.month = faker.date.month();
    this.year = (new Date().getFullYear() - 30).toString();

    // Randomly select a country from a preset list
    this.country = this.getRandomCountry();
  }

  // Helper to return a random country from a predefined array
  getRandomCountry(): string {
    const countries = [
      'United States',
      'Canada',
      'New Zealand',
      'Australia',
      'India',
      'Israel',
      'Singapore',
    ];
    return countries[Math.floor(Math.random() * countries.length)];
  }
}

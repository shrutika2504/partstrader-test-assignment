import { APIRequestContext, expect } from '@playwright/test';
import { SignupInfoData } from '../data/SignupInfoData';
import { ENV } from '../env';

/**
 * Creates a test user via API call.
 * Uses data from SignupInfoData and environment variables for password.
 * @param apiContext - Playwright APIRequestContext to perform the HTTP request.
 * @returns Promise resolving to an object containing the created user's email and password.
 */

export async function createTestUser(
  apiContext: APIRequestContext
): Promise<{ email: string; password: string }> {
  const signupData = new SignupInfoData();
  const email = signupData.email;
  const password = ENV.password;

  const response = await apiContext.post(`${ENV.baseUrl}/api/createAccount`, {
    form: {
      name: signupData.fname,
      email,
      password,
      title: 'Mr',
      birth_date: signupData.day,
      birth_month: signupData.month,
      birth_year: signupData.year,
      firstname: signupData.fname,
      lastname: signupData.lname,
      company: signupData.company,
      address1: signupData.address1,
      address2: signupData.address2,
      country: signupData.country,
      zipcode: signupData.zipcode,
      state: signupData.zipcode,
      city: signupData.city,
      mobile_number: signupData.mobileNumber,
    },
  });

  const body = await response.json();
  expect(body.message).toBe('User created!');

  return { email, password };
}

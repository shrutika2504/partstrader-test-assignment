import { test, expect, request, APIRequestContext } from '@playwright/test';
import { ENV } from '../../env';
import { createTestUser } from '../../utils/apiHelpers';

let apiContext: APIRequestContext;
let testEmail: string;
let testPassword: string;

// Before each test: check base URL reachability and create test user via API
// eslint-disable-next-line no-empty-pattern
test.beforeEach(async ({}, testInfo) => {
  // 1. Perform a simple GET request to check if base URL is reachable (no browser involved)
  const healthCheckContext = await request.newContext();
  const healthCheck = await healthCheckContext.get(ENV.baseUrl);
  if (!healthCheck.ok()) {
    // Skip tests if base URL is not reachable
    testInfo.skip(true, `Base URL is not reachable: ${healthCheck.status()}`);
  }

  // 2. Create a fresh API context for requests
  apiContext = await request.newContext();

  // 3. Create a test user via API and store credentials for later use
  const user = await createTestUser(apiContext);
  testEmail = user.email;
  testPassword = user.password;
});

test('API 7: POST to verify login with valid details', async () => {
  // Send POST request with valid email and password to verify login
  const response = await apiContext.post(`${ENV.baseUrl}/api/verifyLogin`, {
    form: {
      email: testEmail,
      password: testPassword,
    },
  });

  // Assert response status and API response content
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.responseCode).toBe(200);
  expect(body.message).toBe('User exists!');
});

test('API 8: POST to verify login without email parameter', async () => {
  // Send POST request missing the email parameter intentionally
  const response = await apiContext.post(`${ENV.baseUrl}/api/verifyLogin`, {
    form: {
      password: testPassword, // email omitted on purpose
    },
  });

  // Validate response status and error message for bad request
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.responseCode).toBe(400);
  expect(body.message).toBe('Bad request, email or password parameter is missing in POST request.');
});

test('API 9: DELETE to verify login (method not supported)', async () => {
  // Send DELETE request to an endpoint that only supports POST
  const response = await apiContext.delete(`${ENV.baseUrl}/api/verifyLogin`);

  // Confirm that the API returns method not supported response
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.responseCode).toBe(405);
  expect(body.message).toBe('This request method is not supported.');
});

test('API 10: POST to verify login with invalid details', async () => {
  // Send POST request with invalid password to test user not found scenario
  const response = await apiContext.post(`${ENV.baseUrl}/api/verifyLogin`, {
    form: {
      email: testEmail,
      password: 'invalidPassword123', // invalid password
    },
  });

  // Validate the response indicates user not found
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.responseCode).toBe(404);
  expect(body.message).toBe('User not found!');
});

import { defineConfig, devices } from '@playwright/test';
import { ENV } from './env'; // Your custom environment module

export default defineConfig({
  // Directory containing your tests
  testDir: './tests',

  // Where to store screenshots, videos, traces
  outputDir: './test-results',

  // Global timeout for each test
  timeout: 60_000,

  // Retry failed tests in CI
  retries: ENV.isCI ? 2 : 0,

  // Run tests in parallel
  fullyParallel: true,

  // Configure reporters
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'report.json' }],
  ],

  // Shared settings for all tests
  use: {
    baseURL: ENV.baseUrl,
    viewport: null,
    launchOptions: {
      args: ['--start-maximized'], // Chromium-only flag to maximize window
    },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  // Define generic projects for cross-browser and API testing
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'WebKit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'API',
      use: {
        baseURL: ENV.baseUrl,
        headless: true,
        ignoreHTTPSErrors: true,
        // No browser-specific settings needed
      },
    },
  ],
});

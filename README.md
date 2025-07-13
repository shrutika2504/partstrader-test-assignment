# PartsTrader Test Assignment

## Purpose

This repository contains the **PartsTrader test assignment**, designed to demonstrate proficiency in automated testing using Playwright.

It includes:

- ✅ UI test scripts written in **TypeScript** using the **Playwright** framework.
- 📄 Implementation of the **Page Object Model (POM)** for maintainable and scalable test architecture.
- 📊 Integration with **HTML reporting** for clear visibility into test results.
- 📥 Support for **external input data** to drive test scenarios dynamically.
- 🌐 **API testing utilities** using Playwright’s `APIRequestContext`, enabling validation of backend endpoints alongside UI workflows.

This document outlines how to set up the project, install dependencies, and run both UI and API tests effectively.

---

## Getting the Latest Code and Running the test

```bash
# Clone the repository (only once)
git clone https://github.com/shrutika2504/partstrader-test-assignment.git
cd partstrader-test-assignment
# Fetch and update to latest version (run anytime)
git pull origin main

## Setting Up the Environment

### Prerequisites

Make sure you have the following installed:

- **Node.js** v21 or higher  
- **npm** (or **Yarn**)  

---

### Installation

Install project dependencies:

```bash
npm install
npm exec playwright install

## Running the Tests

---


Use one of the following commands to execute the test suite:

```bash
# Run All API and UI Test (all  browser)
npx playwright test 
# Run All UI Test (Browser = All Configured)
npx playwright test tests/ui 
# Run All API Test
npx playwright test tests/api --project=API
# Run All UI Test in Dev Environment (Browser = Chromium)
npx cross-env TEST_ENV=dev playwright test tests/ui --project=Chromium
# Run All API Test in Dev Environment (Browser = Chromium)
npx cross-env TEST_ENV=dev npx playwright test tests/api --project=API
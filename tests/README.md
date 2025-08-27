# Testing with Playwright

This project uses [Playwright](https://playwright.dev/) for end-to-end testing.

## Test Structure

The tests are located in the `tests/` directory and include:

- **Menu Access Tests** (`menu-access.test.ts`): Comprehensive tests verifying that users can access all menu functionality including:
  - Splash screen navigation to game menu
  - Menu button interactions and navigation
  - Direct route access
  - Traditional menu navigation
  - Responsive button behavior

## Running Tests

### Prerequisites

Make sure your development server is running before executing tests:

```bash
npm run dev
```

### Test Commands

```bash
# Run all tests (headless)
npm run test

# Run tests with visible browser windows
npm run test:headed

# Run tests with Playwright UI mode (interactive)
npm run test:ui

# View test report after running tests
npm run test:report
```

## Test Configuration

- **Base URL**: Tests run against `http://localhost:5173` (Vite dev server)
- **Browsers**: Chromium and Firefox (WebKit disabled due to system dependencies)
- **Auto-start**: Development server starts automatically before tests
- **Parallel**: Tests run in parallel for faster execution

## What the Tests Verify

1. **Splash Screen Behavior**: Verifies the app loads and automatically navigates to the game menu
2. **Menu Navigation**: Tests all menu buttons and their navigation targets
3. **Route Accessibility**: Ensures direct navigation to menu routes works
4. **Interactive Elements**: Confirms buttons are visible, enabled, and clickable
5. **Cross-browser Compatibility**: Tests run on multiple browsers

## Test Results

All tests verify that users can successfully access and interact with the menu system, ensuring a smooth user experience across different navigation patterns.
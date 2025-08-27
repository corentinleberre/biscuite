import { test, expect } from '@playwright/test';

test.describe('Menu Access Tests', () => {
  test('user can access the main game menu from splash screen', async ({ page }) => {
    // Navigate to the app root (splash screen)
    await page.goto('/');

    // Verify we're on the splash screen by checking for the logo
    await expect(page.locator('img')).toBeVisible();

    // Wait for automatic navigation to game menu (splash screen timeout is 2.5s)
    await page.waitForURL('/game/menu', { timeout: 5000 });

    // Verify we've reached the game menu
    await expect(page.locator('h1')).toContainText('MODE DE JEU');
    
    // Verify menu cards are visible
    const gameCards = page.locator('[class*="flex flex-col space-y-4"]').first();
    await expect(gameCards).toBeVisible();

    // Check for specific game mode cards
    await expect(page.getByText('Mode libre')).toBeVisible();
    await expect(page.getByText('Classique')).toBeVisible();
    await expect(page.getByText('Nrv')).toBeVisible();
    await expect(page.getByText('Les problèmes')).toBeVisible();
  });

  test('user can access different menu sections', async ({ page }) => {
    // Go directly to game menu
    await page.goto('/game/menu');

    // Verify the game menu loads correctly
    await expect(page.locator('h1')).toContainText('MODE DE JEU');

    // Test navigation to free game mode
    await page.getByText('Mode libre').click();
    await page.waitForURL('/game/free');
    await expect(page).toHaveURL('/game/free');

    // Go back to game menu
    await page.goto('/game/menu');

    // Test navigation to classic game mode
    await page.getByText('Classique').click();
    await page.waitForURL('/game/biscuite');
    await expect(page).toHaveURL('/game/biscuite');
  });

  test('user can access traditional menu at /menu', async ({ page }) => {
    // Navigate to the traditional menu
    await page.goto('/menu');

    // Verify the menu title
    await expect(page.locator('h1')).toContainText('BISCUITE');

    // Verify menu buttons are present and clickable
    const playButton = page.getByText('🎲 Jouer');
    const freeButton = page.getByText('🎲 Mode libre');
    const rulesButton = page.getByText('📕 Règles');

    await expect(playButton).toBeVisible();
    await expect(freeButton).toBeVisible();
    await expect(rulesButton).toBeVisible();

    // Test navigation to game mode
    await playButton.click();
    await page.waitForURL('/game/biscuite');
    await expect(page).toHaveURL('/game/biscuite');

    // Go back and test rules navigation
    await page.goto('/menu');
    await rulesButton.click();
    await page.waitForURL('/rules');
    await expect(page).toHaveURL('/rules');

    // Go back and test free mode navigation
    await page.goto('/menu');
    await freeButton.click();
    await page.waitForURL('/game/free');
    await expect(page).toHaveURL('/game/free');
  });

  test('menu buttons are responsive and interactive', async ({ page }) => {
    await page.goto('/menu');

    // Test that specific menu buttons are clickable
    const playButton = page.getByText('🎲 Jouer');
    const freeButton = page.getByText('🎲 Mode libre');
    const rulesButton = page.getByText('📕 Règles');

    // Verify menu buttons are visible and enabled
    await expect(playButton).toBeVisible();
    await expect(playButton).toBeEnabled();
    
    await expect(freeButton).toBeVisible();
    await expect(freeButton).toBeEnabled();
    
    await expect(rulesButton).toBeVisible();
    await expect(rulesButton).toBeEnabled();
  });

  test('app handles direct navigation to menu routes', async ({ page }) => {
    // Test direct navigation to various menu routes
    const routes = ['/menu', '/game/menu', '/rules'];

    for (const route of routes) {
      await page.goto(route);
      
      // Verify page loads without errors
      await expect(page.locator('body')).toBeVisible();
      
      // Check that we're on the correct route
      await expect(page).toHaveURL(route);
    }
  });

  test('splash screen displays correctly before redirecting', async ({ page }) => {
    await page.goto('/');

    // Check that splash screen elements are visible
    const logo = page.locator('img');
    await expect(logo).toBeVisible();

    // Verify splash screen styling
    const splashContainer = page.locator('.splashcreen-gradient');
    await expect(splashContainer).toBeVisible();

    // Verify the logo has the correct styling
    await expect(logo).toHaveClass(/rotate-center/);
    await expect(logo).toHaveClass(/drop-shadow-xl/);
  });
});
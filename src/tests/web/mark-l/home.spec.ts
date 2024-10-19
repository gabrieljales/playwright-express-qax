import { test, expect } from '@playwright/test';
import { WEB_BASE_URL } from '../../../constants/constants';

test('Verificar se o web app do Mark L está online - Local', async ({ page }) => {
  await page.goto(WEB_BASE_URL);
});
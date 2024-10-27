import { test, expect } from '@playwright/test';
import { WEB_BASE_URL } from '../../../constants/constants';

test.describe('001 - Testes relacionados a saúde do Web App', {
  tag: ['@web', '@mark-l', '@health-check', '@smoke']
}, () => {
  test('Verificar se o web app do Mark L está online', {
    tag: ['@positive']
  }, async ({ page }) => {
    await page.goto(WEB_BASE_URL);
    await expect(page).toHaveTitle('Gerencie suas tarefas com Mark L');
  });
});
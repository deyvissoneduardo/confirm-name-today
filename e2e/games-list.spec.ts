import { test, expect } from '@playwright/test';

test('lists released games with expected date and time formats', async ({
  page,
}) => {
  await page.goto('/login');

  await page.getByLabel('Email').fill('jogador@futebol.com');
  await page.getByLabel('Senha').fill('jogador1234');
  await page.getByRole('button', { name: 'Entrar' }).click();

  await page.waitForURL('**/');
  await page.goto('/games');

  await expect(page.getByRole('heading', { name: 'Jogos' })).toBeVisible();

  const emptyMessage = page.getByText('Nenhum jogo em aberto no momento.');
  const gameButtons = page.getByRole('button', { name: 'Confirmar Presença' });

  if (await emptyMessage.isVisible()) {
    await expect(emptyMessage).toBeVisible();
    return;
  }

  await expect(gameButtons.first()).toBeVisible();

  const pageContent = (await page.locator('main').innerText()).replace(
    /\u00a0/g,
    ' '
  );
  expect(pageContent).toMatch(/\b\d{2}\/\d{2}\/\d{4}\b/);
  expect(pageContent).toMatch(/\b\d{2}:\d{2}\b/);
});

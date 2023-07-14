import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const email = faker.internet.email();

test('Sign Up', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('tab', { name: 'SignUp' }).click();
  await page.getByLabel('Email *').click();
  await page.getByLabel('Email *').fill(email);
  await page.getByLabel('Email *').press('Tab');
  await page.getByLabel('Senha *', { exact: true }).fill('password');
  await page.getByLabel('Senha *', { exact: true }).press('Tab');
  await page.getByLabel('Confirme sua Senha *').fill('password');
  await page.getByRole('button', { name: 'SignUp' }).click();
  await expect(page.getByText("Conta criada com sucesso!")).toBeVisible();
  await delay(3000);
  await page.getByRole('button', { name: 'Fechar' }).click();
  await page.getByLabel("Email *").click();
  await page.getByLabel("Email *").fill(email);
  await page.getByLabel("Email *").press("Tab");
  await page.getByLabel("Senha *").fill("password");
  await page.getByLabel("Senha *").press("Enter");
  await expect(page.getByText("Cronograma")).toBeVisible();
  await delay(3000);
});
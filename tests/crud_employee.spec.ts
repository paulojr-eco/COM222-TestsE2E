import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

const avatar = "tests/files/avatar-1.png";
const name = faker.person.firstName();
const newName = faker.person.firstName();

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

test("Crud Employee", async ({ page }) => {
  //Create Employee
  await page.goto("http://localhost:3000/login");
  await page.getByLabel("Email *").click();
  await page.getByLabel("Email *").fill("admin@example.com");
  await page.getByLabel("Email *").press("Tab");
  await page.getByLabel("Senha *").fill("password");
  await page.getByLabel("Senha *").press("Enter");
  await page.getByLabel("expand").click();
  await page.getByRole("link", { name: "Icon Funcionários" }).click();
  await page.getByLabel("expand").click();
  await page.locator("#employee-action-btn").click();
  await page.locator("#name-input").click();
  await page.locator("#name-input").fill(name);
  await page.locator("#email-input").click();
  await page.locator("#email-input").fill(faker.internet.email());
  await page.getByLabel("Registro *").click();
  await page
    .getByLabel("Registro *")
    .fill(faker.number.int({ min: 1, max: 99999 }).toString());
  await page.getByLabel("Status *").first().click();
  await page.getByRole("option", { name: "Ativo", exact: true }).click();
  await page.getByLabel("Ativo").nth(1).click();
  await page.getByRole("option", { name: "Direção" }).click();
  await page.getByLabel("Escolaridade *").click();
  await page.getByRole("option", { name: "Graduação", exact: true }).click();
  await page.getByLabel("RG").click();
  await page.getByLabel("RG").fill("MG-11.111.1111");
  await page.getByLabel("RG").press("Tab");
  await page.getByLabel("CPF").fill("123.456.789-99");
  await page
    .locator("div")
    .filter({ hasText: /^Data de Nascimento\*$/ })
    .getByLabel("Choose date")
    .click();
  await page.getByLabel("calendar view is open, switch to year view").click();
  await page.getByRole("button", { name: "2000" }).click();
  await page.getByRole("gridcell", { name: "1", exact: true }).click();
  await page.getByLabel("Choose date", { exact: true }).click();
  await page.getByLabel("calendar view is open, switch to year view").click();
  await page.getByRole("button", { name: "2022" }).click();
  await page.getByRole("gridcell", { name: "6", exact: true }).click();
  await page.getByLabel("Sexo").click();
  await page.getByRole("option", { name: "Masculino" }).click();
  await page.getByLabel("Endereço *").click();
  await page.getByLabel("Endereço *").fill("Rua Teste");
  await page.getByLabel("Vínculo *").click();
  await page.getByRole("option", { name: "Contratado" }).click();
  await page.setInputFiles("input[type='file']", avatar);
  await page.getByRole("button", { name: "Criar Funcionário" }).click();
  await delay(3000);
  await expect(page.getByText("Funcionário criado com sucesso!")).toBeVisible();
  await page.getByRole("button", { name: "Fechar" }).click();
  await delay(3000);

  //Find Employee
  await page.locator("#employee-search-input").click();
  await page.locator("#employee-search-input").fill("Teste");
  await expect(page.getByText(name)).toBeHidden();
  await page.locator("#employee-search-input").click();
  await page.locator("#employee-search-input").fill(name);
  await expect(page.getByText(name)).toBeVisible();
  await delay(3000);

  //Edit Employee
  await page.locator(`#${name}`).click();
  await page.getByRole("menuitem", { name: "Editar" }).click();
  await page.locator("#name-input").click();
  await page.locator("#name-input").fill(newName);
  await page.getByRole("button", { name: "Editar Funcionário" }).click();
  await delay(3000);
  await expect(
    page.getByText("Funcionário editado com sucesso!")
  ).toBeVisible();
  await page.getByRole("button", { name: "Fechar" }).click();
  await expect(page.getByText(newName)).toBeVisible();
  await delay(3000);

  //Delete Employee
  await page.locator(`#${newName}`).click();
  await page.getByRole("menuitem", { name: "Excluir" }).click();
  await page.getByRole("button", { name: "Confirmar" }).click();
  await expect(page.getByText(newName)).toBeHidden();
  await delay(3000);
});

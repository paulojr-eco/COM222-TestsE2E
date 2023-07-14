import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

const avatar = "tests/files/avatar-2.png";
const name = faker.person.firstName();
const newName = faker.person.firstName();

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

test("Crud Student", async ({ page }) => {
  //Create Student
  await page.goto("http://localhost:3000/login");
  await page.getByLabel("Email *").click();
  await page.getByLabel("Email *").fill("admin@example.com");
  await page.getByLabel("Email *").press("Tab");
  await page.getByLabel("Senha *").fill("password");
  await page.getByLabel("Senha *").press("Enter");
  await page.getByLabel("expand").click();
  await page.locator("#Alunos").click();
  await page.getByLabel("expand").click();
  await page.locator("#student-action-btn").click();
  await page.getByLabel("Nome *").click();
  await page.getByLabel("Nome *").fill(name);
  await page.getByLabel("Email *").click();
  await page.getByLabel("Email *").fill(faker.internet.email());
  await page.getByLabel("Matrícula *").click();
  await page
    .getByLabel("Matrícula *")
    .fill(faker.number.int({ min: 1, max: 99999 }).toString());
  await page.getByLabel("Email do Responsável *").click();
  await page.getByLabel("Email do Responsável *").fill("resp@user.com");
  await page.getByLabel("Série *").click();
  await page.getByRole("option", { name: "Primeira" }).click();
  await page.getByLabel("RG").click();
  await page.getByLabel("RG").fill("MG-65.165.1651");
  await page.getByLabel("CPF").click();
  await page.getByLabel("CPF").fill("651.156.165-161");
  await page.getByLabel("Choose date").click();
  await page.getByLabel("calendar view is open, switch to year view").click();
  await page.getByRole("button", { name: "2000" }).click();
  await page.getByRole("gridcell", { name: "7", exact: true }).click();
  await page.getByLabel("Sexo").click();
  await page.getByRole("option", { name: "Feminino" }).click();
  await page.getByLabel("Endereço *").click();
  await page.getByLabel("Endereço *").fill("Teste");
  await page.setInputFiles("input[type='file']", avatar);
  await page.getByRole("button", { name: "Criar Aluno" }).click();
  await page.getByRole("button", { name: "Fechar" }).click();
  await delay(3000);

  //Find Student
  await page.locator("#student-search-input").click();
  await page.locator("#student-search-input").fill("Teste");
  await expect(page.getByText(name)).toBeHidden();
  await page.locator("#student-search-input").click();
  await page.locator("#student-search-input").fill(name);
  await expect(page.getByText(name)).toBeVisible();
  await delay(3000);

  //Edit Student
  await page.locator(`#${name}`).click();
  await page.getByRole("menuitem", { name: "Editar" }).click();
  await page.locator("#name-input").click();
  await page.locator("#name-input").fill(newName);
  await page.getByRole("button", { name: "Editar Aluno" }).click();
  await delay(3000);
  await expect(page.getByText("Aluno editado com sucesso!")).toBeVisible();
  await page.getByRole("button", { name: "Fechar" }).click();
  await expect(page.getByText(newName)).toBeVisible();
  await delay(3000);

  //Delete Student
  await page.locator(`#${newName}`).click();
  await page.getByRole("menuitem", { name: "Excluir" }).click();
  await page.getByRole("button", { name: "Confirmar" }).click();
  await expect(page.getByText(newName)).toBeHidden();
  await delay(3000);
});

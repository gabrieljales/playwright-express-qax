import { test, expect } from '@playwright/test';
import { WebTaskSteps } from '../../../steps/web/mark-l/webTaskSteps';
import { faker } from '@faker-js/faker';
import { ApiTaskSteps } from '../../../steps/api/mark-l/apiTaskSteps';

test.describe('Testes da funcionalidade de tarefas', () => {
  let webTaskSteps: WebTaskSteps;
  let apiTaskSteps: ApiTaskSteps;

  test.beforeEach(async ({ page, request }) => {
    webTaskSteps = new WebTaskSteps(page);
    apiTaskSteps = new ApiTaskSteps(request);

    await webTaskSteps.navigateToHomePage();
  });

  test('Verificar o cadastro de uma nova tarefa via teclado apertando enter', async () => {
    const taskName = faker.lorem.sentence();
    await webTaskSteps.createTaskWithKeyboard(taskName);

    // Apagar tarefa via API no final do teste
    await apiTaskSteps.deleteTaskByName(taskName);
  });

  test('Verificar o cadastro de uma nova tarefa via click no botão', async ({ page }) => {
    const taskName = faker.lorem.sentence();
    await webTaskSteps.createTaskWithMouseClick(taskName);

    // Apagar tarefa via API no final do teste
    await apiTaskSteps.deleteTaskByName(taskName);
  });
});
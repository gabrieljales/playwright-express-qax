import { test, expect } from '@playwright/test';
import { WebTaskSteps } from '../../../steps/web/mark-l/webTaskSteps';
import { faker } from '@faker-js/faker';
import { ApiTaskSteps } from '../../../steps/api/mark-l/apiTaskSteps';

test.describe('Testes da funcionalidade de tarefas', () => {
  let webTaskSteps: WebTaskSteps;
  let apiTaskSteps: ApiTaskSteps;

  test.beforeEach(async ({ page, request }, testInfo) => {
    webTaskSteps = new WebTaskSteps(page, testInfo);
    apiTaskSteps = new ApiTaskSteps(request);

    await page.setViewportSize({ width: 1920, height: 1080 });
    await webTaskSteps.navigateToHomePage();
  });

  test.afterEach(async () => {
    // Limpar tarefas após cada teste
    await apiTaskSteps.deleteAllTasks();
  });

  test('001 - Verificar o cadastro de uma nova tarefa via click no botão', async () => {
    // Dado que eu tenho uma nova tarefa
    const taskName = faker.lorem.sentence();

    // Quando faço o cadastro dessa tarefa
    await webTaskSteps.createTaskWithMouseClick(taskName);

    // Então essa tarefa deve ser exibida na lista
    const createdTask = await webTaskSteps.getTaskItemByTestId('task-item', taskName);
    await expect(createdTask).toBeVisible();

    // Captura de tela
    await webTaskSteps.takeScreenshot(`after-creating-task-with-mouse-click_${Date.now()}`);
  });

  test('002 - Verificar o cadastro de uma nova tarefa via teclado apertando enter', async () => {
    // Dado que eu tenho uma nova tarefa
    const taskName = faker.lorem.sentence();

    // Quando faço o cadastro dessa tarefa
    await webTaskSteps.createTaskWithKeyboard(taskName);

    // Então essa tarefa deve ser exibida na lista
    const createdTask = await webTaskSteps.getTaskItemByTestId('task-item', taskName);
    await expect(createdTask).toBeVisible();

    // Captura de tela
    await webTaskSteps.takeScreenshot(`after-creating-task-with-keyboard_${Date.now()}`);
  });
});
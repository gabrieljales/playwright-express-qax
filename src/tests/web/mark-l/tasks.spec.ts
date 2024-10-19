import { test, expect } from '@playwright/test';
import { TaskSteps } from '../../../steps/web/mark-l/taskSteps';
import { faker } from '@faker-js/faker';

test.describe('Testes da funcionalidade de tarefas', () => {
  let taskSteps: TaskSteps;

  test.beforeEach(async ({ page }) => {
    taskSteps = new TaskSteps(page);
    await taskSteps.navigateToHomePage();
  });

  test('Verificar o cadastro de uma nova tarefa via teclado apertando enter', async ({ page }) => {
    const taskName = faker.lorem.sentence();
    await taskSteps.createTaskWithKeyboard(taskName);
  });

  test('Verificar o cadastro de uma nova tarefa via click no botão', async ({ page }) => {
    const taskName = faker.lorem.sentence();
    await taskSteps.createTaskWithMouseClick(taskName);
  });
});
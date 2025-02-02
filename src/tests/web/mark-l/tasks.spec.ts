import { test, expect } from '@playwright/test';
import { WebTaskSteps } from '../../../steps/web/mark-l/webTaskSteps';
import { faker } from '@faker-js/faker';
import { ApiTaskSteps } from '../../../steps/api/mark-l/apiTaskSteps';
import { CreateTask } from '../../../domain/entities/createTask';

test.describe('Testes da funcionalidade de tarefas', {
  tag: ['@web', '@mark-l', '@tasks', '@smoke']
}, () => {
  let webTaskSteps: WebTaskSteps;
  let apiTaskSteps: ApiTaskSteps;
  let newTask: CreateTask;

  test.beforeEach(async ({ page, request }, testInfo) => {
    webTaskSteps = new WebTaskSteps(page, testInfo);
    apiTaskSteps = new ApiTaskSteps(request);

    newTask = {
      name: faker.lorem.sentence(),
      is_done: false
    };

    await page.setViewportSize({ width: 1920, height: 1080 });
    await webTaskSteps.navigateToHomePage();
  });

  test.afterEach(async () => {
    // Limpar tarefas após cada teste
    await apiTaskSteps.deleteAllTasks();
  });

  test('001 - Verificar o cadastro de uma nova tarefa via click no botão', {
    tag: ['@create', '@positive']
  }, async () => {
    // Given que eu tenho uma nova tarefa
    // When faço o cadastro dessa tarefa
    await webTaskSteps.createTaskWithMouseClick(newTask.name);

    // Then essa tarefa deve ser exibida na lista
    const createdTask = await webTaskSteps.getTaskItemByTestId('task-item', newTask.name);
    await expect(createdTask).toBeVisible();

    // Captura de tela
    await webTaskSteps.takeScreenshot(`after-creating-task-with-mouse-click_${Date.now()}`);
  });

  test('002 - Verificar o cadastro de uma nova tarefa via teclado apertando enter', {
    tag: ['@create', '@positive']
  }, async () => {
    // Given que eu tenho uma nova tarefa

    // When faço o cadastro dessa tarefa
    await webTaskSteps.createTaskWithKeyboard(newTask.name);

    // Then essa tarefa deve ser exibida na lista
    const createdTask = await webTaskSteps.getTaskItemByTestId('task-item', newTask.name);
    await expect(createdTask).toBeVisible();

    // Captura de tela
    await webTaskSteps.takeScreenshot(`after-creating-task-with-keyboard_${Date.now()}`);
  });

  test('003 - Verificar mensagem de erro ao tentar cadastrar tarefas duplicadas', {
    tag: ['@create', '@negative']
  }, async () => {
    // Given que eu tenho uma nova tarefa

    // When tento fazer o cadastro dessa tarefa duas vezes
    await webTaskSteps.createTaskWithKeyboard(newTask.name);
    await webTaskSteps.createTaskWithKeyboard(newTask.name);

    // Then uma mensagem de erro deve ser exibida alertando que a tarefa já existe
    await webTaskSteps.verifyTaskAlreadyExistsError();

    // Captura de tela
    await webTaskSteps.takeScreenshot(`task-already-exists_${Date.now()}`);
  });

  test('004 - Verificar mensagem de alerta informando que o nome da tarefa é um campo obrigatório', {
    tag: ['@create', '@negative']
  }, async () => {
    // Given que eu tenho uma nova tarefa
    newTask.name = '';

    // When tento fazer o cadastro dessa tarefa sem informar um nome
    await webTaskSteps.createTaskWithKeyboard(newTask.name);

    // Then uma mensagem de erro deve ser exibida alertando que o campo é obrigatório
    await webTaskSteps.verifyTaskNameIsRequired();

    // Captura de tela
    await webTaskSteps.takeScreenshot(`task-required-field_${Date.now()}`);
  });

  test('005 - Verificar a conclusão de uma tarefa', {
    tag: ['@update', '@positive']
  }, async () => {
    // Given que eu tenho uma nova tarefa
    // When faço o cadastro dessa tarefa
    await webTaskSteps.createTaskWithMouseClick(newTask.name);

    // Then deve ser possível marcá-la como concluída
    const targetTask = await webTaskSteps.getTaskItemByTestId('task-item', newTask.name);
    await webTaskSteps.toggleTheTaskToDoneStatus(targetTask);

    // And o status da tarefa deve ter sido alterado e o seu texto deve ficar taxado
    await webTaskSteps.verifyTaskIsDoneByClass(targetTask);

    // Captura de tela
    await webTaskSteps.takeScreenshot(`toggle-task-done-status_${Date.now()}`);
  });

  test('006 - Verificar a exclusão de uma tarefa', {
    tag: ['@delete', '@positive']
  }, async () => {
    // Given que eu tenho uma nova tarefa
    // When faço o cadastro dessa tarefa
    await webTaskSteps.createTaskWithMouseClick(newTask.name);

    // Then deve ser possível excluí-la ao clicar no ícone de lixeira
    const targetTask = await webTaskSteps.getTaskItemByTestId('task-item', newTask.name);
    await webTaskSteps.removeTaskByClicking(targetTask);

    // And a tarefa não deve mais estar presente na lista de tarefas
    await webTaskSteps.verifyTaskDoesNotExist('task-item', newTask.name);

    // Captura de tela
    await webTaskSteps.takeScreenshot(`toggle-task-done-status_${Date.now()}`);
  });
});
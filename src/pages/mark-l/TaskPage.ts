import { Page } from "@playwright/test";
import { taskPageSelectors } from './taskPageSelectors';

export class TaskPage {
  constructor(private page: Page) {}

  get newTaskInput() {
    return this.page.locator(taskPageSelectors.NEW_TASK_INPUT_ID);
  }

  get createButton() {
    return this.page.locator(taskPageSelectors.CREATE_TASK_BUTTON);
  }

  get taskExistsModalError() {
    return this.page.locator(taskPageSelectors.TASK_ALREADY_EXISTS_MODAL_ERROR);
  }

  get taskExistsModalErrorMessage() {
    return taskPageSelectors.TASK_ALREADY_EXISTS_MODAL_ERROR_MESSAGE;
  }

  get requiredFieldErrorMessage() {
    return taskPageSelectors.REQUIRED_FIELD_ERROR_MESSAGE;
  }
}
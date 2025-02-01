import { Locator, Page } from "@playwright/test";
import { taskPageSelectors } from './taskPageSelectors';

export class TaskPage {
  constructor(private page: Page) {}

  get newTaskInput(): Locator {
    return this.page.locator(taskPageSelectors.NEW_TASK_INPUT_ID);
  }

  get createButton(): Locator {
    return this.page.locator(taskPageSelectors.CREATE_TASK_BUTTON);
  }

  get toggleButton(): Locator {
    return this.page.locator(taskPageSelectors.TASK_TOGGLE_BUTTON);
  }

  get deleteButton(): Locator {
    return this.page.locator(taskPageSelectors.TASK_DELETE_BUTTON);
  }

  get taskExistsModalError(): Locator {
    return this.page.locator(taskPageSelectors.TASK_ALREADY_EXISTS_MODAL_ERROR);
  }

  get taskExistsModalErrorMessage(): string {
    return taskPageSelectors.TASK_ALREADY_EXISTS_MODAL_ERROR_MESSAGE;
  }

  get requiredFieldErrorMessage(): string {
    return taskPageSelectors.REQUIRED_FIELD_ERROR_MESSAGE;
  }
}
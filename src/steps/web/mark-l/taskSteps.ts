import { Locator, Page } from "@playwright/test";
import { homePageSelectors } from "../../../pages/mark-l/homePage";
import { WEB_BASE_URL } from "../../../constants/constants";

export class TaskSteps {
  constructor(private page: Page) {}

  async navigateToHomePage(): Promise<void> {
    await this.page.goto(WEB_BASE_URL);
  }

  async createTaskWithKeyboard(taskName: string): Promise<void> {
    const inputTaskField = this.page.locator(homePageSelectors.NEW_TASK_INPUT_ID);
    await inputTaskField.fill(taskName);

    await this.submitTask(inputTaskField, 'keyboard');
  }

  async createTaskWithMouseClick(taskName: string): Promise<void> {
    const inputTaskField = this.page.locator(homePageSelectors.NEW_TASK_INPUT_ID);
    await inputTaskField.fill(taskName);

    const createButton = this.page.locator(homePageSelectors.CREATE_TASK_BUTTON);
    await this.submitTask(createButton, 'click');
  }

  private async submitTask(locator: Locator, method: 'keyboard' | 'click'): Promise<void> {
    if (method === 'keyboard') {
      await locator.press('Enter');
    } else if (method === 'click') {
      await locator.click()
    }
  }
}
import { Locator, Page, TestInfo } from "@playwright/test";
import { homePageSelectors } from "../../../pages/mark-l/homePage";
import { WEB_BASE_URL } from "../../../constants/constants";

export class WebTaskSteps {
  constructor(private page: Page, private testInfo: TestInfo) {}

  async navigateToHomePage(): Promise<void> {
    await this.page.goto(WEB_BASE_URL);
  }

  async takeScreenshot(name: string): Promise<void> {
    const screenshot = await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });

    // Attach to report
    this.testInfo.attach(name, {
      body: screenshot,
      contentType: 'image/png'
    });
    
    console.log(`Screenshot taken! Path: screenshots/${name}.png`);
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

  async getTaskItemByTestId(testId: string, targetText: string): Promise<Locator> {
    return this.page.getByTestId(testId).filter({ hasText: targetText })
  }

  private async submitTask(locator: Locator, method: 'keyboard' | 'click'): Promise<void> {
    if (method === 'keyboard') {
      await locator.press('Enter');
    } else if (method === 'click') {
      await locator.click()
    }
  }
}
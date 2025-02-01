import { expect, Locator, Page, TestInfo } from "@playwright/test";
import { WEB_BASE_URL } from "../../../constants/constants";
import { TaskPage } from "../../../pages/mark-l/TaskPage";

export class WebTaskSteps {
  private taskPage: TaskPage;
  
  constructor(private page: Page, private testInfo: TestInfo) {
    this.taskPage = new TaskPage(page);
  }

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

  async getLocatorBySelector(selector: string): Promise<Locator> {
    return this.page.locator(selector);
  }

  async getTaskItemByTestId(testId: string, targetText: string): Promise<Locator> {
    return this.page.getByTestId(testId).filter({ hasText: targetText })
  }

  async createTaskWithKeyboard(taskName: string): Promise<void> {
    // OBS: newTaskInput e createButton são chamados sem parênteses pois são getters do TS!
    const inputTaskFieldSelector = this.taskPage.newTaskInput;
    await inputTaskFieldSelector.fill(taskName);

    await this.submitTask(inputTaskFieldSelector, 'keyboard');
  }

  async createTaskWithMouseClick(taskName: string): Promise<void> {
    const inputTaskFieldSelector = this.taskPage.newTaskInput;
    await inputTaskFieldSelector.fill(taskName);

    const createButtonSelector = this.taskPage.createButton;
    await this.submitTask(createButtonSelector, 'click');
  }

  async verifyTaskAlreadyExistsError(): Promise<void> {
    const errorSelector = this.taskPage.taskExistsModalError;
    const errorMessageSelector = this.taskPage.taskExistsModalErrorMessage;
    
    await expect(errorSelector).toHaveText(errorMessageSelector);
  }

  async verifyTaskNameIsRequired(): Promise<void> {
    const requiredFieldErrorMessage = this.taskPage.requiredFieldErrorMessage;
    const inputTaskName = this.taskPage.newTaskInput;
    const validationMessage = await inputTaskName.evaluate(element => (element as HTMLInputElement).validationMessage);
  
    expect(validationMessage).toEqual(requiredFieldErrorMessage);
  }

  async toggleTheTaskToDoneStatus(task: Locator): Promise<void> {
    const toggleButton = task.locator(this.taskPage.toggleButton);

    await toggleButton.click();
  }

  async verifyTaskIsDoneByClass(task: Locator): Promise<void> {
    const toggleButton = task.locator(this.taskPage.toggleButton);
    await expect(toggleButton).toHaveClass(/listItemToggleSelected/);
  }

  async removeTaskByClicking(task: Locator): Promise<void> {
    const deleteButton = task.locator(this.taskPage.deleteButton);
    await deleteButton.click();
  }

  async verifyTaskDoesNotExist(testId: string, taskName: string) {
    const targetTask = await this.getTaskItemByTestId(testId, taskName);
    
    // Verifica que a task foi removida do DOM
    await expect(targetTask).not.toBeAttached();
  }

  private async submitTask(locator: Locator, method: 'keyboard' | 'click'): Promise<void> {
    if (method === 'keyboard') {
      await locator.press('Enter');
    } else if (method === 'click') {
      await locator.click()
    }
  }
}
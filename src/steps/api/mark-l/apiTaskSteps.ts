import { APIRequestContext } from "@playwright/test";
import { API_BASE_URL } from "../../../constants/constants";
import { Task } from "../../../domain/entities/task";
import { TaskNotFoundError } from "../../../domain/errors/TaskNotFoundError";

export class ApiTaskSteps {
  protected request: APIRequestContext;
  protected baseURL: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseURL = API_BASE_URL;
  }

  async listTasks(): Promise<Task[]> {
    const response = await this.request.get(`${this.baseURL}/tasks`);
    return response.json();
  }

  async findTaskByName(taskName: string): Promise<Task> {
    const tasks = await this.listTasks();
    const task = tasks.find(task => task.name === taskName);

    if (!task) {
      throw new TaskNotFoundError(taskName);
    }

    return task;
  }

  async deleteTaskById(taskId: string): Promise<void> {
    await this.request.delete(`${this.baseURL}/tasks/${taskId}`);
  }

  async deleteTaskByName(taskName: string): Promise<void> {
      const task = await this.findTaskByName(taskName);
      await this.deleteTaskById(task.id);
  }

  async deleteAllTasks(): Promise<void> {
      const tasks = await this .listTasks();

      for (const task of tasks) {
        await this.deleteTaskById(task.id);
      }
  }
}
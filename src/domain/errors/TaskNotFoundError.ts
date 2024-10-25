import { BaseError } from './BaseError';

export class TaskNotFoundError extends BaseError {
  constructor(taskName: string) {
    super(`Task with name "${taskName}" not found.`);
  }
}

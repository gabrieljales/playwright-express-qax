export class BaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name; // Nome da classe como o nome do erro
  }
}

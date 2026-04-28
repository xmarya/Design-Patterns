export class Success<S> {
  readonly success: true;
  readonly data: S;
  readonly statusCode: number;

  constructor({statusCode, data}:{statusCode: number, data: S}) {
    this.success = true;
    this.statusCode = statusCode;
    this.data = data;
  }
}

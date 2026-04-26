export class Success<S> {
  readonly success: true;
  readonly result: S;
  readonly statusCode: number;

  constructor(statusCode: number, value: S) {
    this.success = true;
    this.statusCode = statusCode;
    this.result = value;
  }
}

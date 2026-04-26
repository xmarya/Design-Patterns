import type { ErrorTemplate } from "./ErrorTemplate";

export class BadRequest implements ErrorTemplate {
  readonly success: false;
  readonly reason: string;
  readonly statusCode: number;
  readonly message: string;

  constructor(message: string) {
    this.success = false;
    this.reason = "bad-request";
    this.statusCode = 400;
    this.message = message;
  }
}

import type { ErrorTemplate } from "./ErrorTemplate";

export class Failure implements ErrorTemplate {
  readonly success: false;
  readonly reason: string;
  readonly statusCode: number;
  readonly message: string;
  constructor(message?: string) {
    this.success = false;
    this.reason = "error";
    this.statusCode = 500;
    this.message = message ?? "Couldn't process the request, Something went wrong.";
  }
}

export interface ErrorTemplate {
  readonly success: false;
  readonly reason: string;
  readonly statusCode:number;
  readonly message: string;
}

import type { ErrorTemplate } from "./ErrorTemplate";

export class NotFound implements ErrorTemplate {
    readonly success:false;
    readonly reason: string;
    readonly statusCode: number;
    readonly message: string;

    constructor(message?:string) {
        this.success = false;
        this.reason = "not-found";
        this.statusCode = 404;
        this.message = message ?? "Couldn't find the requested data."
    }
}
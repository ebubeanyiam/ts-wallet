import { CustomError, ErrorArray } from "./customError";

export class BadRequestError extends CustomError {
  statusCode: number = 400;

  constructor(public params: ErrorArray[]) {
    super("Bad request");

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return { message: "Bad request", status: false, errors: this.params };
  }
}

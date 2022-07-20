import { CustomError } from "./customError";

export class NotAuthorizedError extends CustomError {
  statusCode: number = 401;

  constructor() {
    super("Unauthorized");

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return { message: "Unauthorized", status: false };
  }
}

import { CustomError } from "./customError";
import { ValidationError } from "express-validator";

export class RequestValidationError extends CustomError {
  statusCode = 400;
  _errors = this.errors.map((error) => {
    return { issue: error.msg, field: error.param };
  });

  constructor(public errors: ValidationError[]) {
    super("Invalid request");

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return { status: false, message: "Invalid request", errors: this._errors };
  }
}

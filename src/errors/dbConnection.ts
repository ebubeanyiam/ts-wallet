import { CustomError } from "./customError";

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = "Error connecting to the database";

  constructor(issue: string) {
    super(issue);

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return {
      status: false,
      message: this.reason,
      errors: [{ issue: this.reason }],
    };
  }
}

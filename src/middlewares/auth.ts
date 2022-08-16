import { Request, Response, NextFunction } from "express";

import vars from "../config/vars";
import { NotAuthorizedError } from "../errors";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const { host, token } = req.headers;

  try {
    if (vars.appRequestToken !== token) throw new NotAuthorizedError();

    next();
  } catch (error) {
    throw new NotAuthorizedError();
  }
};

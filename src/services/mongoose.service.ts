import mongoose from "mongoose";
import vars from "../config/vars";

import { DatabaseConnectionError } from "../errors";

// print mongoose logs in dev env
if (vars.env === "development") {
  mongoose.set("debug", true);
}

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */
export const connect = () => {
  if (!vars.mongo.uri) throw new DatabaseConnectionError("Invalid MongoURI");

  mongoose.connect(vars.mongo.uri);
  return mongoose.connection;
};

import express from "express";
import "express-async-errors";

import compress from "compression";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

import vars from "./vars";
import { allowCompression } from "../helpers/compress";

import { NotFoundError } from "../errors";
import { errorHandler } from "../middlewares/errorHandler";

import routes from "../routes/v1";

/**
 * Express instance
 * @public
 */
const app = express();

// request logging. dev: console | production: file
app.use(morgan(vars.logs));

// parse body params and attache them to req.body
app.use(express.json());

// gzip compression
app.use(compress({ filter: allowCompression }));

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// mount api v1 routes
app.use("/v1", routes);

app.all("*", () => {
  throw new NotFoundError("Route Not Found");
});

// Handle Application errors
app.use(errorHandler);

export default app;

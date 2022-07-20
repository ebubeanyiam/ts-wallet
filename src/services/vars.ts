import path from "path";

// import .env variables
require("dotenv-safe").config({
  path: path.join(__dirname, "../../.env"),
  sample: path.join(__dirname, "../../.env.example"),
});

const vars = {
  env: process.env.NODE_ENV,
  port: process.env.NODE_PORT,
  mongo: {
    uri:
      process.env.NODE_ENV === "test"
        ? process.env.MONGO_URI_TESTS
        : process.env.MONGO_URI,
  },
  appRequestToken: process.env.APP_REQUEST_TOKEN,
  logs: process.env.NODE_ENV === "production" ? "combined" : "dev",
};

export default vars;

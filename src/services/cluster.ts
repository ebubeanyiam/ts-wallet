import cluster from "cluster";
import os from "os";

import app from "./app";
import vars from "./vars";
import { connect } from "./mongoose";

// open mongoose connection
connect();

const { port, env } = vars;

// Get the number of threads running on your server
const numCpu = os.cpus().length;

export default (() => {
  // Create a new worker process if current worker is the primary one
  if (cluster.isPrimary && env !== "development") {
    for (let i = 0; i < numCpu; i++) {
      cluster.fork();
    }

    // Create a new instance of a worker once a worker has gone off
    cluster.on("exit", () => {
      cluster.fork();
    });
    return;
  }

  app.listen(env === "development" ? port : process.env.PORT, () => {
    console.info(`server started on port ${port} (${env})`);
  });
})();

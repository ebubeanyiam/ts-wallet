import vars from "./services/vars";
import app from "./services/app";
import { connect } from "./services/mongoose";

// open mongoose connection
connect();

const { port, env } = vars;

// listen to requests
app.listen(port, () => console.info(`server started on port ${port} (${env})`));

/**
 * Exports express
 * @public
 */

// export default app;

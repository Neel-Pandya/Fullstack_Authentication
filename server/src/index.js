import app from "./app.js";
import { appHost, appPort } from "./config/env.config.js";
import createSocketIOServer from "./socket.js";
import connectDB from "./utils/connectDB.js";
import {createServer} from "node:http";
import errorHandler from "./utils/errorHandler.js"

connectDB().then(() => {
    const server = createServer(app);
    createSocketIOServer(server);
    server.listen(appPort, appHost, () => console.log(`App is running on port ${appPort}`));
    app.use(errorHandler)
}).catch((err) => {
    console.log("ERROR Occured ", err);
});

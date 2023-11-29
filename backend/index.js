import express from "express";

/** @module Logger - Логирование */
import logger from "./src/logger/logger.js";

import connection from "./src/database/connection.js";

const app = express();
const port = 5050;

app.use(express.json());

connection().then(() => {
    app.listen(port, () => {
        logger.info(`App: ${port}`);
    });
});

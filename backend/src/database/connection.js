/** @module Mongoose - Прослойка */
import mongoose from "mongoose";

/** @module Logger - Логирование */
import logger from "../logger/logger.js";

/** @function
 * @name connection - Подключение к базе данных */
export default async function connection() {
    try {
        await mongoose.connect("mongodb://localhost:27017/Guide-names", {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        logger.info("Database connection!");
    } catch ({ message }) {
        logger.fatal(message);
    }
}
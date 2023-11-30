/** @module Mongoose - Прослойка */
import mongoose from "mongoose";

/** @module Logger - Логирование */
import logger from "../logger/logger.js";

/** @function
 * @name connection - Подключение к базе данных */
export default async function connection() {
    try {
        await mongoose.connect("mongodb+srv://kiryushavoronin2004:XWHvgCNulkzd9LGF@namescluster.f5uou2k.mongodb.net/");

        logger.info("Database connection!");
    } catch ({ message }) {
        console.log(message)
        logger.fatal(message);
    }
}


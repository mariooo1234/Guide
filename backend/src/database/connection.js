/** @module Mongoose - Прослойка */
import mongoose from "mongoose";

/** @module Logger - Логирование */
import logger from "../logger/logger.js";

/** @function
 * @name connection - Подключение к базе данных */
export default async function connection() {
    try {
        await mongoose.connect("mongodb+srv://kirill:1234567890@cluster0.pgpraan.mongodb.net/");

        logger.info("Database connection!");
    } catch ({ message }) {
        console.log(message)
        logger.fatal(message);
    }
}


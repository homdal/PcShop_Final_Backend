import mongoose from "mongoose";
import Logger from "../logs/logger.js";
import { initDB } from "./initDB.js";
const connect = async () => {
  try {
    const connectionString = process.env.DB_CONNECTION_STRING;

    if (!connectionString) {
      Logger.error("DB_CONNECTION_STRING IS NOT DEFINED IN your .env file");
      return;
    }

    await mongoose.connect(connectionString);
    Logger.debug("Database Connected");
    await initDB();
  } catch (err) {
    Logger.error("Error Connecting to database", err);
  }
};
export default connect;

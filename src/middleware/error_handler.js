import Logger from "../logs/logger.js";
import EshopError from "../error/error.js";
const errorHandler = (err, req, res, next) => {
  Logger.error(err);
  if (err instanceof EshopError) {
    return res.status(err.status).json({ message: err.message });
  }
  if (err.code && err.code == 11000 && err.keyPattern && err.keyValue) {
    return res.status(400).json({
      message: "Duplicate key - Must be unique",
      propery: err.keyValue,
      index: err.keyPattern,
    });
  }
  if (err instanceof SyntaxError) {
    return res.status(400).json({ message: "Invalid Json" });
  }
  return res.status(500).json({ message: "Internal Server Error", err });
};
export default errorHandler;

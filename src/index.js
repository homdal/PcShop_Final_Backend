import configDotEnv from "./config/index.js";
import express, { json } from "express";
import morgan from "morgan";
import cors from "cors";
import notFound from "./middleware/not_found.js";
import errorHandler from "./middleware/error_handler.js";
import { usersRouter } from "./routes/users.js";
import { productsRouter } from "./routes/products.js";
import { productImagesRouter } from "./routes/product_Images.js";
import { userImagesRouter } from "./routes/user_images.js";
import connect from "./database/connection.js";
import { orderRouter } from "./routes/orders.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

configDotEnv();
connect();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.static("public"));
app.use(json());
app.use(morgan("dev"));
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/product-images", productImagesRouter);
app.use("/api/v1/user-images", userImagesRouter);
app.use(errorHandler);
app.use(notFound);
app.listen(5000);

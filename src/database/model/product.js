import mongoose from "mongoose";
import productSchema from "../schema/product_schema.js";
const Product = mongoose.model("product", productSchema);
export default Product;

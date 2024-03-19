import mongoose from "mongoose";
import orderSchema from "../schema/order_schema.js";
const Order = mongoose.model("order", orderSchema);
export default Order;

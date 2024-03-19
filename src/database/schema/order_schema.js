import { Schema } from "mongoose";
import addressSchema from "./address_schema.js";
import contactSchema from "./contact_info_schema.js";

const orderSchema = new Schema({
  customer: {
    contactInfo: { type: contactSchema },
    address: { type: addressSchema },
  },
  items: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      pricePer: { type: Number, required: true },
      priceCol: { type: Number, required: true },
    },
  ],
  orderNum: { type: Number, required: true },
  total: { type: Number, required: true },
  deliveryOption: { type: String, required: true },
  status: { type: String, required: true },
  userId: { type: String, required: false },
  creationDate: { type: Date, required: false, default: new Date() },
});
export default orderSchema;

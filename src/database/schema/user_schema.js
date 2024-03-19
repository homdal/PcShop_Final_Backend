import { Schema } from "mongoose";
import addressSchema from "./address_schema.js";
import contactSchema from "./contact_info_schema.js";

const userSchema = new Schema({
  contactInfo: { type: contactSchema },
  password: {
    type: String,
    required: true,
    minLength: 7,
    maxLength: 100,
  },
  address: {
    type: addressSchema,
  },
  orders: [{ type: Number, required: false }],
  isAdmin: {
    type: Boolean,
    required: false,
    default: false,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  isEmployee: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    required: false,
    default: new Date(),
  },
});
export default userSchema;

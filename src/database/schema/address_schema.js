import { Schema } from "mongoose";

const addressSchema = new Schema({
  country: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 60,
  },
  city: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 60,
  },
  street: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 60,
  },
  houseNumber: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 2,
  },
  zip: {
    type: String,
    required: false,
    default: "0",
    minLength: 0,
    maxLength: 7,
  },
});
export default addressSchema;

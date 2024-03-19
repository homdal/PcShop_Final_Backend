import { Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 200,
  },
  category: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
  subCategory: {
    type: String,
    required: true,
    minLength: 0,
    maxLength: 30,
  },
  description: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 400,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    max: 50,
  },
  warranty: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 7,
  },
  manufacturer: {
    type: String,
    required: false,
    minLength: 0,
    maxLength: 50,
    default: "",
  },
  productModel: {
    type: String,
    required: false,
    minLength: 0,
    maxLength: 20,
    default: "",
  },
  color: {
    type: String,
    required: false,
    minLength: 0,
    maxLength: 20,
    default: "",
  },
  imageUrl: { type: String, required: true },
  dimensions: {
    height: {
      type: String,
      required: false,
      minLength: 0,
    },
    width: {
      type: String,
      required: false,
      minLength: 0,
    },
    length: {
      type: String,
      required: false,
      minLength: 0,
    },
    weight: {
      type: String,
      required: false,
      minLength: 0,
    },
  },
  specifications: [
    {
      specName: { type: String, required: false },
      specDesc: { type: String, required: false },
    },
  ],
  price: {
    type: Number,
    required: true,
    minLength: 2,
    maxLength: 5,
  },
  tags: [{ type: String, required: false }],
  added: {
    on: { type: Date, required: false, default: new Date() },
    by: { type: String, required: true },
  },
});
export default productSchema;

import { Schema } from "mongoose";

const contactSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
  },
  email: {
    type: String,
    required: true,
    minLength: 7,
    maxLength: 50,
  },
  phone: {
    type: String,
    required: true,
    minLength: 9,
    maxLength: 15,
  },
});

export default contactSchema;

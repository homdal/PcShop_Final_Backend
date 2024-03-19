import { Schema } from "mongoose";

const imageSchema = new Schema({
  originalName: { type: String },
  newName: { type: String },
  imageUrl: { type: String },
});

export default imageSchema;

import mongoose from "mongoose";
import imageSchema from "../schema/image_schema.js";
const Image = mongoose.model("image", imageSchema);
export default Image;

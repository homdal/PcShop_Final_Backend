import mongoose from "mongoose";
import userSchema from "../schema/user_schema.js";
const User = mongoose.model("user", userSchema);
export default User;

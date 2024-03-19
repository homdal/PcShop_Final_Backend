import EshopError from "../error/error.js";
import authService from "../service/auth_service.js";
import User from "../database/model/user.js";
import { extractToken } from "./validate_token.js";

const isEmployee = async (req, res, next) => {
  const token = extractToken(req, next);
  if (!token) {
    return;
  }
  const { _id } = authService.verifyJWT(token);
  const user = await User.findOne({ _id });
  if (!user) throw new EshopError("User not found", 404);
  req.user = user;
  const isEmployee = user?.isEmployee;
  if (isEmployee) {
    return next();
  }
  return res.status(401).json({ message: "Must be an employee" });
};
export default isEmployee;

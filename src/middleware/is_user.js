import authService from "../service/auth_service.js";
import User from "../database/model/user.js";
import { extractToken } from "./validate_token.js";
import EshopError from "../error/error.js";

const isUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = extractToken(req);
    if (!token) {
      return;
    }
    const { _id } = authService.verifyJWT(token);
    const user = await User.findOne({ _id }).lean();
    if (!user) throw new EshopError("User not found", 404);

    req.user = user;

    if (id == user?._id) return next();

    res.status(401).json({ message: "The id must belong to the user" });
  } catch (e) {
    next(e);
  }
};

export { isUser };

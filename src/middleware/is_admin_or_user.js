import authService from "../service/auth_service.js";
import User from "../database/model/user.js";
import { extractToken } from "./validate_token.js";
import EshopError from "../error/error.js";

const isAdminOrUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = extractToken(req);
    if (!token) {
      return;
    }
    const { _id } = authService.verifyJWT(token);

    const user = await User.findOne({ _id });

    if (!user) throw new EshopError("User not found", 404);

    if (id == user.id) return next();

    if (user.isAdmin) return next();

    res
      .status(401)
      .json({ message: "Only admin or the user in question may proceed" });
  } catch (e) {
    next(e);
  }
};

export default isAdminOrUser;

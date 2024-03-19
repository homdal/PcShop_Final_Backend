import User from "../database/model/user.js";
import EshopError from "../error/error.js";
import authService from "../service/auth_service.js";

const extractToken = (req, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (
      authHeader &&
      authHeader.length > 7 &&
      authHeader.toLowerCase().startsWith("bearer ")
    ) {
      return authHeader.substring(7);
    }
    throw new EshopError(
      "token is missing in Authorization header, must log into an account to receive token",
      400
    );
  } catch (e) {
    next(e);
  }
};

const validateToken = async (req, res, next) => {
  const token = extractToken(req, next);
  const { _id } = authService.verifyJWT(token);
  const user = await User.findOne({ _id });
  if (!user) throw new EshopError("User not found", 404);
  req.user = user;
  next();
};

const checkForUserId = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (
    authHeader &&
    authHeader.length > 7 &&
    authHeader.toLowerCase().startsWith("bearer ")
  ) {
    const { _id } = authService.verifyJWT(authHeader.substring(7));
    const user = await User.findOne({ _id });
    if (user) {
      req.userId = _id;
    }
  }
  next();
};

export { extractToken, validateToken, checkForUserId };

import User from "../database/model/user.js";
import authService from "./auth_service.js";
import EshopError from "../error/error.js";

const createUser = async (data) => {
  const user = new User(data);
  const exists = await User.findOne({
    "contactInfo.email": data?.contactInfo?.email,
  });
  if (exists) {
    throw new EshopError("Email already exists", 400);
  } else {
    user.password = await authService.hashPassword(user.password);
    return user.save();
  }
};

const validateUser = async (email, password) => {
  const user = await User.findOne({ "contactInfo.email": email });
  if (!user) {
    throw new EshopError("Bad credentials(email)", 401);
  }
  const isPasswordValid = await authService.vaildatePassword(
    password,
    user.password
  );
  if (!isPasswordValid) {
    throw new EshopError("Bad Credentials(pass)", 401);
  }
  const jwt = authService.generateJWT({ _id: user._id });
  return { jwt };
};
export { createUser, validateUser };

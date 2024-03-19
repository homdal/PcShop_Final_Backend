import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const authService = {
  hashPassword: (password, rounds = 12) => {
    return bcrypt.hash(password, rounds);
  },
  vaildatePassword: (password, hash) => {
    return bcrypt.compare(password, hash);
  },
  generateJWT: (payload) => {
    const secret = process.env.JWT_SECRET;
    return jwt.sign(payload, secret);
  },
  verifyJWT: (token) => {
    const secret = process.env.JWT_SECRET;
    const payload = jwt.verify(token, secret);
    return payload;
  },
};
export default authService;

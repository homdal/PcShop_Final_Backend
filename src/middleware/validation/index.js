import joiLoginSchema from "../../validation/login_joi.js";
import registerSchema from "../../validation/user_joi.js";
import validateSchema from "./validate_schema.js";
import productSchema from "../../validation/product_joi.js";
import orderSchema from "../../validation/order_joi.js";

const validateRegistration = validateSchema(registerSchema);
const validateLogin = validateSchema(joiLoginSchema);
const validateProduct = validateSchema(productSchema);
const validateOrder = validateSchema(orderSchema);

export { validateRegistration, validateLogin, validateProduct, validateOrder };

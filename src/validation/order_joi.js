import Joi from "joi";
import { phoneRegex, zipRegex } from "./patterns.js";

const orderSchema = Joi.object({
  customer: Joi.object({
    contactInfo: Joi.object({
      firstName: Joi.string()
        .required()
        .messages({
          "string.empty": "must provide a first name",
          "string.min": "must be at least 2 characters long",
          "string.max": "cannot longer than 20 characters",
        })
        .min(2)
        .max(20),
      lastName: Joi.string()
        .required()
        .messages({
          "string.empty": "must provide a last name",
          "string.min": "must be at least 2 characters long",
          "string.max": "cannot be longer than 20 characters",
        })
        .min(2)
        .max(20),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
          "string.empty": "must provide an email",
          "string.email":
            "must be a valid email address, example: name@example.com",
          "string.min": "must be at least 7 characters long",
          "string.max": "cannot be longer than 50 characters",
        })
        .min(7)
        .max(50),
      phone: Joi.string()
        .required()
        .pattern(phoneRegex)
        .messages({
          "string.pattern.base": "must be a valid phone number",
          "string.empty": "must provide a phone number",
          "string.min": "must be at least 9 characters long",
          "string.max": "cannot be longer than 15 characters",
        })
        .min(9)
        .max(15),
    }),
    address: Joi.object({
      country: Joi.string()
        .required()
        .messages({
          "string.empty": "must enter a country",
          "string.min": "must be at least 2 characters long",
          "string.max": "cannot be longer than 20 characters",
        })
        .min(2)
        .max(20),
      city: Joi.string()
        .required()
        .messages({
          "string.empty": "must enter a city",
          "string.min": "must be at least 2 characters long",
          "string.max": "cannot be longer than 20 characters",
        })
        .min(2)
        .max(20),
      street: Joi.string()
        .required()
        .messages({
          "string.empty": "must enter a street",
          "string.min": "must be at least 2 characters long",
          "string.max": "cannot be longer than 50 characters",
        })
        .min(2)
        .max(50),
      houseNumber: Joi.string()
        .pattern(zipRegex)
        .required()
        .messages({
          "string.empty": "must enter house number",
          "string.pattern.base": "house number has to be a number",
          "string.min": "must be at least 1 characters long",
          "string.max": "cannot be longer than 2 characters",
        })
        .min(1)
        .max(2),
      zip: Joi.string()
        .pattern(zipRegex)
        .messages({
          "string.empty": "must enter zip code",
          "string.pattern.base": "zip code has to be a number",
          "string.min": "must be at least 2 characters long",
          "string.max": "cannot be longer than 7 characters",
        })
        .min(2)
        .max(7)
        .required(),
    }),
  }),
  items: Joi.array().items({
    productId: Joi.string().required(),
    name: Joi.string().required(),
    quantity: Joi.number().required(),
    pricePer: Joi.number().required(),
    priceCol: Joi.number().required(),
  }),
  total: Joi.number().required(),
  deliveryOption: Joi.string().required(),
});

export default orderSchema;

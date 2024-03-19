import Joi from "joi";

const productSchema = Joi.object({
  name: Joi.string()
    .messages({
      "string.empty": "must enter product name",
      "string.min": "must be at least 3 characters long",
      "string.max": "cannot be longer than 200 characters",
    })
    .required()
    .min(3)
    .max(200),
  category: Joi.string()
    .messages({
      "string.empty":
        "must enter product category (desktop/laptop/hardware/periphery)",
      "string.min": "must be at least 3 characters long",
      "string.max": "cannot be longer than 200 characters",
    })
    .required()
    .min(3)
    .max(200),
  subCategory: Joi.string()
    .messages({
      "string.max": "cannot be longer than 200 characters",
    })
    .max(200)
    .required(),
  description: Joi.string()
    .messages({
      "string.empty": "must enter product description",
      "string.min": "must be at least 10 characters long",
      "string.max": "cannot be longer than 200 characters",
    })
    .required()
    .min(10)
    .max(400),
  stock: Joi.number()
    .messages({
      "string.empty": "must enter amount of stock",
      "number.base": "stock has to be a number",
      "number.max": "cannot be more than 50",
    })
    .min(0)
    .max(50)
    .required(),
  warranty: Joi.string()
    .messages({
      "string.empty": "must enter warranty info",
      "string.min": "must be at least 3 characters long",
      "string.max": "cannot be longer than 200 characters",
    })
    .required()
    .min(3)
    .max(50),
  manufacturer: Joi.string()
    .messages({
      "string.max": "cannot be longer than 200 characters",
    })
    .max(50)
    .allow(""),
  productModel: Joi.string()
    .messages({
      "string.min": "must be at least 2 characters long",
      "string.max": "cannot be longer than 200 characters",
    })
    .max(50)
    .allow(""),
  color: Joi.string()
    .messages({
      "string.max": "cannot be longer than 20 characters",
    })
    .max(20)
    .allow(""),
  imageUrl: Joi.string()
    .messages({
      "string.max": "cannot be longer than 20 characters",
    })
    .required(),
  dimensions: Joi.object({
    height: Joi.string()
      .messages({
        "string.max": "cannot be longer than 10 characters",
      })
      .max(10)
      .allow(""),
    width: Joi.string()
      .messages({
        "string.max": "cannot be longer than 10 characters",
      })
      .max(10)
      .allow(""),
    length: Joi.string()
      .messages({
        "string.max": "cannot be longer than 10 characters",
      })
      .max(10)
      .allow(""),
    weight: Joi.string()
      .messages({
        "string.max": "cannot be longer than 10 characters",
      })
      .max(10)
      .allow(""),
  }),
  specifications: Joi.array().items({
    specName: Joi.string()
      .messages({
        "string.max": "cannot be longer than 30 characters",
      })
      .max(30)
      .allow(""),
    specDesc: Joi.string()
      .messages({
        "string.max": "cannot be longer than 30 characters",
      })
      .max(30)
      .allow(""),
  }),
  price: Joi.number()
    .messages({
      "string.empty": "must enter price",
      "number.base": "price has to be a number",
      "number.min": "must be at least 10",
      "number.max": "cannot be higher than 20,000",
    })
    .min(10)
    .max(20000)
    .required(),
  added: Joi.object({
    on: Joi.date(),
    by: Joi.string(),
  }),
});

export default productSchema;

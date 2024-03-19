import validation from "./validation.js";

const validateSchema = (schema) => (req, res, next) => {
  const error = validation(schema, req.body);

  if (!error) return next();

  res.status(400).json({ error });
};

export default validateSchema;

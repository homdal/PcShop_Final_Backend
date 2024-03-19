const validation = (schema, userInput) => {
  const { error } = schema.validate(userInput);
  if (!error) {
    return null;
  }

  const { message, path } = error.details[0];
  return { message, path };
};

export default validation;

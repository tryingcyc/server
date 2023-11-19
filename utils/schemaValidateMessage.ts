import { Error } from "mongoose";

const schemaValidateMessage = (error: Error.ValidationError) => {
  const errors: { [key: string]: string } = {};
  for (var key in error.errors) errors[key] = error.errors[key].message;
  return errors;
};

export { schemaValidateMessage };

const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegistrationInput(data) {
  let errors = {};

  if (isEmpty(data.username)) {
    errors.username = "Username is required";
  } else if (!validator.isLength(data.username, { min: 3, max: 30 })) {
    errors.username = "Username must be between 3 and 30 characters";
  }

  if (isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (isEmpty(data.password)) {
    errors.password = "Password is required";
  } else if (!validator.isLength(data.password, { min: 6, max: 20 })) {
    errors.password = "Password must be between 3 and 30 characters";
  }

  if (isEmpty(data.password2)) {
    errors.password2 = "Please confirm your password";
  } else if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "password doesn't match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

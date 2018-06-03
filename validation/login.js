const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  if (isEmpty(data.user)) {
    errors.user = 'Email or Username is required';
  }

  if (validator.isEmail(data.user)) {
    data.email = data.user;
  } else {
    data.username = data.user;
  }

  if (isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  if (isEmpty(data.text)) {
    errors.text = 'Text is required';
  } else if (!validator.isLength(data.text, { max: 50 })) {
    errors.text = 'Maximum 50 character';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

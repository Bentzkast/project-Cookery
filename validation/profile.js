const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  if (isEmpty(data.status)) {
    errors.status = 'Status field is required';
  }

  if (!isEmpty(data.bio) && (!validator.isLength(data.bio), { max: 120 })) {
    errors.bio = 'Bio max length is 120 character';
  }

  if (!isEmpty(data.youtube) && !validator.isURL(data.youtube)) {
    errors.youtube = 'Not a valid URL';
  }
  if (!isEmpty(data.twitter) && !validator.isURL(data.twitter)) {
    errors.twitter = 'Not a valid URL';
  }
  if (!isEmpty(data.facebook) && !validator.isURL(data.facebook)) {
    errors.facebook = 'Not a valid URL';
  }
  if (!isEmpty(data.instagram) && !validator.isURL(data.instagram)) {
    errors.instagram = 'Not a valid URL';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

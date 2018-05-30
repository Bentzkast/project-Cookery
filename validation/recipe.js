const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRecipeInput(data) {
  let errors = {};

  if (isEmpty(data.title)) {
    errors.title = 'Title is required';
  } else if (validator.isLength(data.title, { min: 5, max: 30 })) {
    errors.title = 'Title length needed to be between 5 and 30';
  }

  if (isEmpty(data.ingredients)) {
    errors.ingredients = 'Ingredients is required';
  } else if (!Array.isArray(data.ingredients)) {
    errors.ingredients = 'Wrong ingredients format (array)';
  }

  if (isEmpty(data.directions)) {
    errors.directions = 'Directions is required';
  } else if (!Array.isArray(data.directions)) {
    errors.directions = 'Wrong directions format (array)';
  }

  if (!isEmpty(data.nutritions) && Array.isArray(data.nutritions)) {
    errors.nutritions = 'Wrong nutritions format (array)';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

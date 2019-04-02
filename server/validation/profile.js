const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  const errors = {};

  /* eslint-disable no-param-reassign */
  data.headline = !isEmpty(data.headline) ? data.headline : '';
  /* eslint-disable no-param-reassign */

  if (!Validator.isLength(data.headline, { min: 2, max: 40 })) {
    errors.headline = 'Headline needs to between 2 and 40 characters';
  }

  if (Validator.isEmpty(data.headline)) {
    errors.headline = 'Profile headline is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

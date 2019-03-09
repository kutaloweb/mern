const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  const errors = {};

  /* eslint-disable no-param-reassign */
  data.name = !isEmpty(data.name) ? data.name : '';
  data.title = !isEmpty(data.title) ? data.title : '';
  data.content = !isEmpty(data.content) ? data.content : '';
  /* eslint-enable no-param-reassign */

  if (!Validator.isLength(data.content, { min: 3, max: 3000 })) {
    errors.content = 'Post content must be between 3 and 3000 characters';
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }
  if (Validator.isEmpty(data.title)) {
    errors.title = 'Post title field is required';
  }
  if (Validator.isEmpty(data.content)) {
    errors.content = 'Post content field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

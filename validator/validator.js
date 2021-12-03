const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const {
  INVALID_LINK,
  REQUIRED_FIELD,
  MIN_LENGTH_NAME,
  MAX_LENGTH_NAME,
  INCORECT_EMAIL_TEXT,
  MIN_LENGTH_PASSWORD,
  MIN_LENGTH_ID,
} = require('../utils/constants');

const linkValidator = (value, helpers) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  return helpers.message(INVALID_LINK);
};

const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().message(INCORECT_EMAIL_TEXT).required()
      .messages({ 'any.required': REQUIRED_FIELD }),
    password: Joi.string().min(5).required()
      .messages({
        'string.min': MIN_LENGTH_PASSWORD,
        'any.required': REQUIRED_FIELD,
      }),
  }),
});

const createUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': MIN_LENGTH_NAME,
        'string.max': MAX_LENGTH_NAME,
        'any.required': REQUIRED_FIELD,
      }),
    email: Joi.string().email().message(INCORECT_EMAIL_TEXT).required()
      .messages({ 'any.required': REQUIRED_FIELD }),
    password: Joi.string().min(5).required()
      .messages({
        'string.min': MIN_LENGTH_PASSWORD,
        'any.required': REQUIRED_FIELD,
      }),
  }),
});

const updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': MIN_LENGTH_NAME,
        'string.max': MAX_LENGTH_NAME,
        'any.required': REQUIRED_FIELD,
      }),
    email: Joi.string().email().message(INCORECT_EMAIL_TEXT).required()
      .messages({ 'any.required': REQUIRED_FIELD }),
  }),
});

const postMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().messages({ 'any.required': REQUIRED_FIELD }),
    director: Joi.string().required().messages({ 'any.required': REQUIRED_FIELD }),
    duration: Joi.number().required().messages({ 'any.required': REQUIRED_FIELD }),
    year: Joi.string().required().messages({ 'any.required': REQUIRED_FIELD }),
    description: Joi.string().required().messages({ 'any.required': REQUIRED_FIELD }),
    image: Joi.string().required().custom(linkValidator).messages({ 'any.required': REQUIRED_FIELD }),
    trailer: Joi.string().required().custom(linkValidator).messages({ 'any.required': REQUIRED_FIELD }),
    thumbnail: Joi.string().required().custom(linkValidator).messages({ 'any.required': REQUIRED_FIELD }),
    movieId: Joi.number().required().messages({ 'any.required': REQUIRED_FIELD }),
    nameRU: Joi.string().min(2).required()
      .messages({
        'string.min': MIN_LENGTH_NAME,
        'any.required': REQUIRED_FIELD,
      }),
    nameEN: Joi.string().min(2).required()
      .messages({
        'string.min': MIN_LENGTH_NAME,
        'any.required': REQUIRED_FIELD,
      }),
  }),
});

const deleteMovieValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).message(MIN_LENGTH_ID),
  }),
});

module.exports = {
  createUserValidator,
  loginValidator,
  updateUserValidator,
  postMovieValidator,
  deleteMovieValidator,
};

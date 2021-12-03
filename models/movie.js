const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Обязательное поле'],
    },
    director: {
      type: String,
      required: [true, 'Обязательное поле'],
    },
    duration: {
      type: Number,
      required: [true, 'Обязательное поле'],
    },
    year: {
      type: String,
      required: [true, 'Обязательное поле'],
    },
    description: {
      type: String,
      required: [true, 'Обязательное поле'],
    },
    image: {
      type: String,
      required: [true, 'Обязательное поле'],
      validate: {
        validator(v) {
          return validator.isURL(v);
        },
        message: 'Ссылка некорректна',
      },
    },
    trailer: {
      type: String,
      required: [true, 'Обязательное поле'],
      validate: {
        validator(v) {
          return validator.isURL(v);
        },
        message: 'Ссылка некорректна',
      },
    },
    thumbnail: {
      type: String,
      required: [true, 'Обязательное поле'],
      validate: {
        validator(v) {
          return validator.isURL(v);
        },
        message: 'Ссылка некорректна',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Обязательное поле'],
      ref: 'user',
    },
    movieId: {
      type: Number,
      required: [true, 'Обязательное поле'],
      ref: 'movie',
    },
    nameRU: {
      type: String,
      required: [true, 'Обязательное поле'],
    },
    nameEN: {
      type: String,
      required: [true, 'Обязательное поле'],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);

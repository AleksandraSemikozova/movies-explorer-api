const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const Forbidden = require('../errors/forbidden-error');
const {
  INVALID_DATA_TEXT, NOT_FOUND_MOVIE_TEXT, FORBIDDEN_MOVIE_TEXT, REMOVE_MOVIE_TEXT,
} = require('../utils/constants');

const getMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
};

const postMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(INVALID_DATA_TEXT));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError(NOT_FOUND_MOVIE_TEXT));
      }
      if (movie.owner.toString() !== req.user._id) {
        next(new Forbidden(FORBIDDEN_MOVIE_TEXT));
      } else {
        movie.remove()
          .then(() => {
            res.send({ message: REMOVE_MOVIE_TEXT });
          })
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(INVALID_DATA_TEXT));
      }
      return next(err);
    });
};

module.exports = { getMovies, postMovie, deleteMovie };

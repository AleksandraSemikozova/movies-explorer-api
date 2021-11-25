const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ConflictError = require('../errors/conflict-error');
const NotAuthError = require('../errors/not-auth-error');
const { JWT_SECRET } = require('../utils/config');
const {
  INVALID_AUTH_DATA_TEXT, NOT_FOUND_USER_TEXT, INVALID_DATA_TEXT, CONFLICT_EMAIL_ERR_TEXT,
} = require('../utils/constants');

const login = (req, res, next) => {
  const { password, email } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      return res.send({ token });
    })
    .catch(() => {
      next(new NotAuthError(INVALID_AUTH_DATA_TEXT));
    });
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        return res.status(200).send(user);
      }
      throw new NotFoundError(NOT_FOUND_USER_TEXT);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(INVALID_DATA_TEXT));
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    }))
    .then((user) => {
      res.status(201).send({
        email: user.email,
        name: user.name,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(INVALID_DATA_TEXT));
      }
      if (err.code === 11000) {
        next(new ConflictError(CONFLICT_EMAIL_ERR_TEXT));
      }
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.message === 'ValidationError') {
        next(new BadRequestError(INVALID_DATA_TEXT));
      }
      if (err.code === 11000) {
        next(new ConflictError(CONFLICT_EMAIL_ERR_TEXT));
      }
      return next(err);
    });
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  login,
};

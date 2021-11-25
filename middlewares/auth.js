const jwt = require('jsonwebtoken');
const NotAuthError = require('../errors/not-auth-error');
const { JWT_SECRET } = require('../utils/config');
const { NOT_AUTH_ERR_TEXT } = require('../utils/constants');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotAuthError(NOT_AUTH_ERR_TEXT);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new NotAuthError(NOT_AUTH_ERR_TEXT);
  }

  req.user = payload;

  next();
};

module.exports = auth;

const jwt = require('jsonwebtoken');
const NotAuthError = require('../errors/not-auth-error');
const { JWT_SECRET } = require('../utils/config');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotAuthError('Авторизуйтесь!');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new NotAuthError('Авторизуйтесь!');
  }

  req.user = payload;

  next();
};

module.exports = auth;

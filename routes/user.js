const routerUsers = require('express').Router();
const { createUserValidator, loginValidator, updateUserValidator } = require('../validator/validator');
const {
  login, getUser, createUser, updateUser,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

routerUsers.post('/signup', createUserValidator, createUser);

routerUsers.post('/signin', loginValidator, login);

routerUsers.use(auth);
routerUsers.get('/users/me', getUser);
routerUsers.patch('/users/me', updateUserValidator, updateUser);

module.exports = routerUsers;

const routerMovies = require('express').Router();
const {
  getMovies, postMovie, deleteMovie,
} = require('../controllers/movies');
const { postMovieValidator, deleteMovieValidator } = require('../validator/validator');
const auth = require('../middlewares/auth');

routerMovies.use(auth);

routerMovies.get('/movies', getMovies);
routerMovies.post('/movies', postMovieValidator, postMovie);
routerMovies.delete('/movies/:movieId', deleteMovieValidator, deleteMovie);

module.exports = routerMovies;

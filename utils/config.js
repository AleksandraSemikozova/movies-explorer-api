require('dotenv').config();

const { JWT_SECRET = 'JWT_SECRET', MONGO_SERVER = 'mongodb://localhost:27017/moviesdb' } = process.env;

module.exports = {
  JWT_SECRET,
  MONGO_SERVER,
};

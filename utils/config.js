require('dotenv').config();

const { JWT_SECRET = 'JWT_SECRET', MONGO_SERVER = 'MONGO_SERVER' } = process.env;

module.exports = {
  JWT_SECRET,
  MONGO_SERVER,
};

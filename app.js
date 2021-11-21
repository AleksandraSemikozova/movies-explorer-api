require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
const cors = require('./middlewares/cors');

const app = express();
const { PORT = 3000, MONGO_SERVER = 'mongodb://localhost:27017/moviesdb' } = process.env;

app.use(cors);

mongoose.connect(MONGO_SERVER, {
  useNewUrlParser: true,
});

app.use(requestLogger);
app.use(express.json());
app.use(helmet());
app.use(limiter);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('App listen express');
});

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  if (err.kind === 'ObjectId') {
    res.status(400).send({ message: 'Переданы некорректные данные' });
  } else {
    res
      .status(statusCode)
      .send({
        message: statusCode === 500
          ? 'На сервере произошла ошибка'
          : message,
      });
  }
  next();
};

module.exports = errorHandler;

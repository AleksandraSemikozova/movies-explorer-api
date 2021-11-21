const allowedCors = [
  'https://api.mesto.semikozova.nomoredomains.rocks',
  'http://api.mesto.semikozova.nomoredomains.rocks',
  'https://mesto.semikozova.nomoredomains.rocks',
  'http://mesto.semikozova.nomoredomains.rocks',
  'https://localhost:3001',
  'https://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3000',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = ((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;

  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);

    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }
  return next();
});

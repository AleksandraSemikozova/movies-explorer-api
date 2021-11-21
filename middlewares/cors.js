const allowedCors = [
  'https://api.diploma.semikozova.nomoredomains.rocks',
  'http://api.diploma.semikozova.nomoredomains.rocks',
  'https://diploma.semikozova.nomoredomains.rocks',
  'http://diploma.semikozova.nomoredomains.rocks',
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

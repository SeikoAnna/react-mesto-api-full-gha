const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

// const extractJwtToken = (header) => header.replace('jwt=', '');

// const auth = (req, res, next) => {
//   const { cookie } = req.headers;

//   if (!cookie || !(cookie.startsWith('jwt='))) {
//     return next(new Unauthorized('Ошибка авторизации'));
//   }

//   const token = extractJwtToken(cookie);
//   let payload;

//   try {
//     payload = jwt.verify(token, 'super_strong_password');
//   } catch (err) {
//     return next(new Unauthorized('Ошибка авторизации'));
//   }

//   req.user = payload;

//   return next();
// };

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new Unauthorized('Ошибка авторизации'));
  }

  req.user = payload;

  return next();
};

module.exports = { auth };

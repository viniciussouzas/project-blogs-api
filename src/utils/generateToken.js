const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'secretJWT';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (payload) => {
  const token = jwt.sign(payload, secret, jwtConfig);

  return token;
};

module.exports = generateToken;
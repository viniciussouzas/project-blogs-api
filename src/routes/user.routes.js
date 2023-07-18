const route = require('express').Router();
const { userController } = require('../controllers');
const { 
  validateDisplayName,
  validateEmail,
  validatePassword,
} = require('../middlewares/validateCreateUser');
const validateToken = require('../middlewares/validateJWT');

route.get('/', validateToken, userController.getAll);
route.post('/', validateDisplayName, validateEmail, validatePassword, userController.create);

module.exports = route;
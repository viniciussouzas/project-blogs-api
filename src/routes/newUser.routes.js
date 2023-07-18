const route = require('express').Router();
const { createController } = require('../controllers');
const { 
  validateDisplayName,
  validateEmail,
  validatePassword,
} = require('../middlewares/validateCreateUser');

route.post('/', validateDisplayName, validateEmail, validatePassword, createController.create);

module.exports = route;
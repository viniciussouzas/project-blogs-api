const route = require('express').Router();

const { categoryController } = require('../controllers');
const { validateName } = require('../middlewares/validateCreateCategory');
const validateToken = require('../middlewares/validateJWT');

route.get('/', validateToken, categoryController.getAll);
route.post('/', validateToken, validateName, categoryController.create);

module.exports = route;
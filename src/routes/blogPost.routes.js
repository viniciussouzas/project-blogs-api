const route = require('express').Router();

const { blogPostController } = require('../controllers');
const validatePost = require('../middlewares/validateCreatePost');
const validateToken = require('../middlewares/validateJWT');
const validateUpdate = require('../middlewares/validateUpdate');

route.get('/', validateToken, blogPostController.getAll);
route.get('/:id', validateToken, blogPostController.getById);
route.post('/', validateToken, validatePost, blogPostController.create);
route.put('/:id', validateToken, validateUpdate, blogPostController.update);

module.exports = route;
const { BlogPost, User, Category } = require('../models');

const create = async (newPost) => {
  const post = await BlogPost.create(newPost);

  return { status: 'CREATED', data: post };
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: 
      [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories' },
      ],
  });

  return { status: 'SUCCESSFUL', data: posts };
};

module.exports = {
  create,
  getAll,
};
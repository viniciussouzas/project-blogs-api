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

const getById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: 
      [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories' },
      ],
  });

  if (!post) {
    return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  }

  return { status: 'SUCCESSFUL', data: post };
};

const update = async (id, title, content) => {
  const updtPost = await BlogPost.update(
    { title, content },
    { where: { id } },
    );

  return { status: 'SUCCESSFUL', data: updtPost };
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};
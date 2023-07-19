const { BlogPost } = require('../models');

const create = async (newPost) => {
  const post = await BlogPost.create(newPost);

  return { status: 'CREATED', data: post };
};

module.exports = {
  create,
};
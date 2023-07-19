const { PostCategory } = require('../models');

const bulkCreate = async (posts) => {
  const postsCategories = await PostCategory.bulkCreate(posts);

  return { status: 'CREATED', data: postsCategories };
};

module.exports = {
  bulkCreate,
};
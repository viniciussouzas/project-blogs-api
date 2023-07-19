const { Category } = require('../models');

const create = async (newCategory) => {
  const { name } = newCategory;

  const checkCategory = await Category.findOne({
    where: { name },
  });

  if (checkCategory) {
    return { status: 'CONFLICT', data: { message: 'Category already registered' } };
  }

  const category = await Category.create({ name });

  return { status: 'CREATED', data: category };
};

module.exports = {
  create,
};
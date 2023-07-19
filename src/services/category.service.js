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

const getAll = async () => {
  const categories = await Category.findAll();

  return { status: 'SUCCESSFUL', data: categories };
};

module.exports = {
  create,
  getAll,
};
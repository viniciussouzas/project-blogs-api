const { User } = require('../models');
const generateToken = require('../utils/generateToken');

const create = async (newUserObj) => {
  const { displayName, email, password, image } = newUserObj;

  const checkUser = await User.findOne({
    where: { email },
  });

  if (checkUser) {
    return { status: 'CONFLICT', data: { message: 'User already registered' } };
  }

  await User.create({ displayName, email, password, image });

  const token = generateToken({ displayName, email, image });

  return { status: 'CREATED', data: { token } };
};

const getAll = async () => {
  const users = await User.findAll({
    attributes: {
      exclude: ['password'],
    },
  });

  return { status: 'SUCCESSFUL', data: users };
};

const getById = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: {
      exclude: ['password'],
    },
  });

  if (!user) {
    return { status: 'NOT_FOUND', data: { message: 'User does not exist' } };
  }

  return { status: 'SUCCESSFUL', data: user };
};

module.exports = {
  create,
  getAll,
  getById,
};
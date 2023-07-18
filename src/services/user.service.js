const { User } = require('../models');
const generateToken = require('../utils/generateToken');

const create = async (newUserObj) => {
  const { displayName, email, password, image } = newUserObj;

  const checkUser = await User.findOne({
    where: { email },
    attributes: {
      exclude: ['password'],
    },
  });

  if (checkUser.dataValues) {
    return { status: 'CONFLICT', data: { message: 'User already registered' } };
  }

  await User.create({ displayName, email, password, image });

  const token = generateToken(checkUser.dataValues);

  return { status: 'CREATED', data: token };
};

const getAll = async () => {
  const users = await User.findAll({
    attributes: {
      exclude: ['password'],
    },
  });

  return { status: 'SUCCESSFUL', data: users };
};

module.exports = {
  create,
  getAll,
};
const { User } = require('../models');

const create = async (newUserObj) => {
  const { displayName, email, password, image } = newUserObj;

  const checkUser = await User.findOne({
    where: { email },
  });

  if (checkUser) {
    return { status: 'CONFLICT', data: { message: 'User already registered' } };
  }

  const newUser = await User.create({ displayName, email, password, image });

  return { status: 'CREATED', data: newUser.dataValues };
};

module.exports = {
  create,
};
const { User } = require('../models');
const generateToken = require('../utils/generateToken');

const login = async (email, password) => {
  const user = await User.findOne({
    where: { email, password },
    attributes: {
      exclude: ['password'],
    },
  });

  if (!user.dataValues) {
    return { status: 'REQUIRED_VALUE', data: { message: 'Invalid fields' } };
  }

  const token = generateToken(user.dataValues);

  return { status: 'SUCCESSFUL', data: token };
};

module.exports = {
  login,
};
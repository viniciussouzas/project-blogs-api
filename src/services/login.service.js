const { User } = require('../models');

const login = async (email, password) => {
  const user = await User.findOne({
    where: { email, password },
  });

  if (!user) {
    return { status: 'REQUIRED_VALUE', data: { message: 'Invalid fields' } };
  }

  return { status: 'SUCCESSFUL', data: user.dataValues };
};

module.exports = {
  login,
};
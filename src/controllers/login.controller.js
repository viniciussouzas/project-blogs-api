const { loginService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const error500 = 'Algo deu errado';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
  
    const { status, data } = await loginService.login(email, password);

    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    return res.status(500).json({ message: error500 });
  }
};

module.exports = {
  login,
};
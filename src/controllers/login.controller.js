const { loginService } = require('../services');
const generateToken = require('../utils/generateToken');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const error500 = 'Algo deu errado';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
  
    const { status, data } = await loginService.login(email, password);

    if (status === 'REQUIRED_VALUE') {
      return res.status(mapStatusHTTP(status)).json(data);
    }

    const dataPayload = { id: data.id, email: data.email };

    const token = generateToken(dataPayload);
  
    return res.status(mapStatusHTTP(status)).json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error500 });
  }
};

module.exports = {
  login,
};
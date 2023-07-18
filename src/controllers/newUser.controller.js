const { createService } = require('../services');
const generateToken = require('../utils/generateToken');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const error500 = 'Algo deu errado';

const create = async (req, res) => {
  try {
    const newUserObj = req.body;
  
    const { status, data } = await createService.create(newUserObj);

    if (status === 'CONFLICT') {
      return res.status(mapStatusHTTP(status)).json(data);
    }

    const dataPayload = { 
      id: data.id,
      displayName: data.displayName,
      email: data.email,
      image: data.image,
    };

    const token = generateToken(dataPayload);
  
    return res.status(mapStatusHTTP(status)).json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error500 });
  }
};

module.exports = {
  create,
};
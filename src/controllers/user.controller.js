const { userService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const error500 = 'Algo deu errado';

const create = async (req, res) => {
  try {
    const newUserObj = req.body;
  
    const { status, data } = await userService.create(newUserObj);
  
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    return res.status(500).json({ message: error500 });
  }
};

const getAll = async (req, res) => {
  try {
    const { status, data } = await userService.getAll();

    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    return res.status(500).json({ message: error500 });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, data } = await userService.getById(id);

    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    return res.status(500).json({ message: error500 });
  }
};

module.exports = {
  create,
  getAll,
  getById,
};
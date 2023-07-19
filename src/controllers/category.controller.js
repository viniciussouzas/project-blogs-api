const { categoryService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const error500 = 'Algo deu errado';

const create = async (req, res) => {
  try {
    const newCategory = req.body;

    const { status, data } = await categoryService.create(newCategory);
  
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    return res.status(500).json({ message: error500 });
  }
};

const getAll = async (req, res) => {
  try {
    const { status, data } = await categoryService.getAll();

    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    return res.status(500).json({ message: error500 });
  }
};

module.exports = {
  create,
  getAll,
};
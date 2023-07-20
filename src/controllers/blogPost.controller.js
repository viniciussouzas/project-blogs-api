const { categoryService, blogPostService, postCategoryService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const error500 = 'Algo deu errado';

const create = async (req, res) => {
  try {
    const { id: userId } = req.user;
  
    const { title, content, categoryIds } = req.body;
  
    const categories = await categoryService.getAll();
    const idsCategories = categories.data.map((category) => category.dataValues.id);
  
    const verifyCategoryIds = categoryIds.every((id) => idsCategories.includes(id));
    
    if (!verifyCategoryIds) {
      return res.status(400).json({ message: 'one or more "categoryIds" not found' });
    }
  
    const { status, data } = await blogPostService.create({ title, content, userId });
  
    const postId = data.dataValues.id;
    const postCategory = categoryIds.map((categoryId) => ({ postId, categoryId }));
    
    await postCategoryService.bulkCreate(postCategory);
  
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    return res.status(500).json({ message: error500 });
  }
};

const getAll = async (req, res) => {
  try {
    const { status, data } = await blogPostService.getAll();
  
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    return res.status(500).json({ message: error500 });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, data } = await blogPostService.getById(id);

    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    return res.status(500).json({ message: error500 });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const { id: userId } = req.user;

    if (Number(id) !== userId) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }

    await blogPostService.update(id, title, content);

    const { status, data } = await blogPostService.getById(id);

    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    return res.status(500).json({ message: error500 });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};
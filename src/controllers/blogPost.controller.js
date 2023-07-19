const { categoryService, blogPostService, postCategoryService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const create = async (req, res) => {
  const userId = req.user.dataValues.id;

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
};

module.exports = {
  create,
};
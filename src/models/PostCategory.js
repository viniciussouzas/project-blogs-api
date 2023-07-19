const PostCategory = (sequelize, DataTypes) => {
  const postCategory = sequelize.define('PostCategory', {
    postId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: 'post_id',
    },
    categoryId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: 'category_id',
    },
  }, {
    timestamps: false,
    tableName:'posts_categories',
    underscored: true
  });

  postCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost,
      { 
        foreignKey: 'categoryId',
        otherKey: 'postId',
        through: postCategory,
        as: 'blog_posts', 
      });

    models.BlogPost.belongsToMany(models.Category,
      {
        foreignKey: 'postId',
        otherKey: 'categoryId',
        through: postCategory,
        as: 'categories',
      });
  };


  return postCategory;
}

module.exports = PostCategory;
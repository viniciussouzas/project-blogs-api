const BlogPost = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    userId: {
      allowNull: false,
      foreignKey: true,
      type: DataTypes.INTEGER,
      field: 'user_id',
    },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    timestamps: false,
    tableName:'blog_posts',
    underscored: true
  });

  blogPost.associate = (models) => {
    blogPost.belongsTo(models.User,
      { foreignKey: 'userId', as: 'users' });
  };


  return blogPost;
}

module.exports = BlogPost;
const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    displayName: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'display_name',
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    image: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  }, {
    timestamps: false,
    tableName:'users',
    underscored: true
  });

  user.associate = (models) => {
    user.hasMany(models.BlogPost, { foreignKey: 'userId', as: 'blog_posts' });
  };


  return user;
}

module.exports = User;
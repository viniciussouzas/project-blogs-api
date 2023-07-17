'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts_categories', {
      postId: {
        allowNull: false,
        references: {
          model: 'blog_posts',
          key: 'id',
        },
        type: Sequelize.INTEGER,
        field: 'post_id',
      },
      categoryId: {
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id',
        },
        type: Sequelize.INTEGER,
        field: 'category_id',
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');  
  }
};

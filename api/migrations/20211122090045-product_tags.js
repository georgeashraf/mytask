'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProductsTags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tagID:{
        type: Sequelize.INTEGER
      },
      productID:{
        type: Sequelize.INTEGER
      },
      

    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ProductsTags');
  }
};
   
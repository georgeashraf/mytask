'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addConstraint('Subcategories',{
      fields: ['categoryID'],
      type: 'foreign key',
      name: 'category_subcategory_association',
      references: {
        table: 'Categories',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('Subcategories',{
      fields: ['CategoryID'],
      type: 'foreign key',
      name: 'category_suncategory_association',
      references: {
        table: 'Categories',
        field: 'id'
      }
    })
  }
};

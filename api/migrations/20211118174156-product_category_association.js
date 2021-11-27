'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addConstraint('Products',{
      fields: ['subcategoryID'],
      type: 'foreign key',
      name: 'subcategory_product_association',
      references: {
        table: 'Subcategories',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('Products',{
      fields: ['subcategoryID'],
      type: 'foreign key',
      name: 'category_product_association',
      references: {
        table: 'Subcategories',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  }
};

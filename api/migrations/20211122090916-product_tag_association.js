'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addConstraint('ProductsTags',{
      fields: ['tagID'],
      type: 'foreign key',
      name: 'productstags_tags_association',
      references: {
        table: 'Tags',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    queryInterface.addConstraint('ProductsTags',{
      fields: ['productID'],
      type: 'foreign key',
      name: 'productstags_product_association',
      references: {
        table: 'Products',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('ProductsTags',{
      fields: ['tagID'],
      type: 'foreign key',
      name: 'productstags_tags_association',
      references: {
        table: 'Tags',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    queryInterface.removeConstraint('ProductsTags',{
      fields: ['productID'],
      type: 'foreign key',
      name: 'productstags_product_association',
      references: {
        table: 'Products',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  }
};

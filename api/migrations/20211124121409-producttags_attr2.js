module.exports = {
  up: function(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      'ProductsTags',
      'updatedAt',
      {
        allowNull: false,
        type: Sequelize.DATE
      }
    );

  },

  down: function(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.removeColumn(
      'ProductsTags',
      'updatedAt',
      {
        allowNull: false,
        type: Sequelize.DATE
      }
    );

  },
}

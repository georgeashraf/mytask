module.exports = {
  up: function(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      'ProductsTags',
      'createdAt',
      {
        allowNull: false,
        type: Sequelize.DATE
      },
    );

  },

  down: function(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.removeColumn(
      'ProductsTags',
      'createdAt',
      {
        allowNull: false,
        type: Sequelize.DATE
      },
    );

  },
}

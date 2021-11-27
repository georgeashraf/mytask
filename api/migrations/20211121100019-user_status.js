module.exports = {
  up: function(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      'Users',
      'status',
      {
        type:Sequelize.ENUM('active', 'blocked'),
        defaultValue: 'active'
      },
    );

  },

  down: function(queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn(
      'Users',
      'status'
    );
  }
}
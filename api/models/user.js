const Sequelize = require('sequelize');
const DB = require('../connection')

const User = DB.define("Users",{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  username: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password:{
    type: Sequelize.STRING
  },
  role:{
    type: Sequelize.ENUM('user', 'admin'),
    defaultValue: 'admin',
  },
  status:{
    type: Sequelize.ENUM('active', 'blocked'),
    defaultValue: 'active',
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
});
module.exports = User
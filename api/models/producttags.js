const Sequelize = require('sequelize');
const DB = require('../connection')

const ProductsTags = DB.define("ProductsTags",{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  tagID: {
    type: Sequelize.INTEGER
  },
  productID: {
    type: Sequelize.INTEGER
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
module.exports = ProductsTags
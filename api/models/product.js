const Sequelize = require('sequelize');
const DB = require('../connection')
const Subcategory = require('./subcategory');

const Product = DB.define("Products",{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  price:{
    type: Sequelize.DOUBLE
  },
  subcategoryID:{
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
Subcategory.hasMany(Product,{foreignKey: 'subcategoryID', sourceKey: 'id'})
Product.belongsTo(Subcategory,{foreignKey: 'subcategoryID', targetKey: 'id'})
module.exports = Product
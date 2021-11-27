const Sequelize = require('sequelize');
const DB = require('../connection')
const Product = require('./product')

const Tag = DB.define("Tags",{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING
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

Tag.belongsToMany(Product, { through: 'ProductTags' });
Product.belongsToMany(Tag, { through: 'ProductTags' });
module.exports = Tag
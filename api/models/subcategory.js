const Sequelize = require('sequelize');
const DB = require('../connection');
const Category = require('./category');

 const Subcategory= DB.define("Subcategories",{
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
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  categoryID: {
    type: Sequelize.INTEGER
  }
})
Category.hasMany(Subcategory,{foreignKey: 'categoryID', sourceKey: 'id'})
Subcategory.belongsTo(Category,{foreignKey: 'categoryID', targetKey: 'id'})
module.exports = Subcategory

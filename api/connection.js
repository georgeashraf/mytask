const Sequelize = require('sequelize');

const DB = new Sequelize('e_commerce','postgres','postgres',{
    host:'db',
    dialect:'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

module.exports = DB;
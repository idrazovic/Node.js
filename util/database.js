const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodejs', 'root', 'rootroot', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
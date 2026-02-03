const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('Blog_db', 'root', '12345', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize
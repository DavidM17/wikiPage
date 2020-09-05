
const { Sequelize } = require('sequelize');

//Setting of Database
const sequelize = new Sequelize('wiki', '', '', {
    dialect: 'sqlite',
    storage: 'wiki-db.sqlite',
    define: {
        underscored: true
    },
    });

module.exports = sequelize;

         

  
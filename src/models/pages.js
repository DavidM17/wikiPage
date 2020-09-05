
const Sequelize = require('sequelize');
const db = require('../database');

const Pages = db.define('pages', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: Sequelize.INTEGER
    },
    beforecontent: {
        type: Sequelize.TEXT
    },
    aftercontent: {
        type: Sequelize.TEXT
    }

})

module.exports = Pages;
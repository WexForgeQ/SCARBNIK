const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'ScarbnikDB',
    'postgres',
    '123',
    {
         dialect: 'postgres',
         host: 'localhost',
         port: 5432,
    } 
)
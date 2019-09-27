var Sequelize = require("sequelize");
 var config = {
    database: 'itp',
    username: 'itp',
    password: 'itp2019',
    host: '47.100.124.154',
    dialect: 'mysql',
    port: 3306,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    timezone: '+08:00' 
 }

 module.exports = config;


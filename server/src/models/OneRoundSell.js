// Author: K


const Sequelize = require('sequelize')
const config = require('../config.js')

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect, 
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        idle: config.pool.idle
    },
    timezone: config.timezone
});

var OneRoundSell = sequelize.define('one_round_sell', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    round: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ka: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    kb: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    kc: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true, // use singular table name
    timestamps: true
});

/**
 * 同步或更新数据库
 */
function sync() {
    OneRoundSell.sync({alter:true});
};

/**
 * 添加一个下游到市场的订单
 */
function addOneRoundSell(userId,inputData) {
    return OneRoundSell.create({
        userId: userId,
        round: inputData.round,
        ka: inputData.ka,
        kb: inputData.kb,
        kc: inputData.kc,
        price: inputData.price,
        amount: inputData.amount,
    });

};

module.exports = {sync, addOneRoundSell};
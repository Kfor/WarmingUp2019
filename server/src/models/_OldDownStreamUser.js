// Author: K
// _DownStreamLogicProcess封装了distributeMarket(turn,oneTurnInputJSON)函数，这里引入后再exports。
// 添加了


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

var User = sequelize.define('down_stream_user', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    
    userId: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: true
    },
    
    phoneNum: {
        type: Sequelize.JSON,
        allowNull: true
    },
    
    totalStroageCost: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },

    xxx: {
        type: Sequelize.FLOAT, //广告投入系数，暂时定为xxx
        allowNull: false,
        defaultValue: 0
    },

    xxxCost: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },

    currency: {
        type:Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },

    debt: {
        type:Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },


}, {
    freezeTableName: true, // use singular table name
    timestamps: true
});

/**
 * 同步或更新数据库
 */
function sync() {
    User.sync({alter: true});
};

/**
 * 添加用户
 */
function addUser(id, password) {
    return User.create({
            userId: userId
        })
};

async function produce(userId, inputData) {
    const result = await findUserByUserId(userId);
    const prev = result.dataValues;

    var xxxCost = Number(prev.xxxCost) + Number(inputData.xxxCost);
    return User.update({
        xxxCost
    },{
        where: {userId: userId}
    })
}


/**
 * 根据id查找用户
 */
function findUserByUserId(userId) {
    return User.findOne({
        where:{
            userId:userId
        }
    })
};



module.exports = {sync, addUser, findUserByUserId, produce};
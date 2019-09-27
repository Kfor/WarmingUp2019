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

var User = sequelize.define('middle_stream_user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: true
    },

    chip1Num: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    chip2Num: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    chip3Num: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
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

    M: {
        type: Sequelize.FLOAT, //美观度投入系数
        allowNull: false,
        defaultValue: 0
    },
    MCost: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    K: {
        type: Sequelize.FLOAT, //功能性度投入系数
        allowNull: false,
        defaultValue: 0
    },
    KCost: {
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

    
    initCurrency: {//初始资金，用于天使投资计算利润率用
        type:Sequelize.FLOAT,
        defaultValue: 0
    },
    lastProfit: {//上一轮的利润
        type:Sequelize.FLOAT,
        defaultValue: 0
    },
    angelCut: {//天使投资人收的股权。如果对赌成功，则为0
        type:Sequelize.FLOAT,
        defaultValue: 0
    }


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
function addUser(userId) {
    return User.create({
            userId: userId
        })
};

async function invest(userId, inputData) {
    const result = await findUserByUserId(userId);
    const prev = result.dataValues;

    var xxxCost = Number(prev.xxxCost) + Number(inputData.xxxCost);
    return User.update({
    //    xxxCost
    },{
        where: {userId: userId}
    })
};

async function produce(userId, inputData) {
    const result = await findUserByUserId(userId);
    const prev = result.dataValues;

    return User.update({
    //    xxxCost
    },{
        where: {userId: userId}
    })
};


async function debt(userId, data) {
    const result = await findUserByUserId(userId);
    const prev = result.dataValues;
    var tmpDebt = Number(prev.debt) + Number(data.debt);
    return User.update({
        debt: tmpDebt,
    }, {
        where: {userId: userId}
    })
};

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


function clear(userId) {
    return User.update({
        phoneNum:null,
    }, {
        where: {userId: userId}
    })
};

async function addCurrency(userId,money) {
    const result = await findUserByUserId(userId);
    const prev = result.dataValues;
    var newCurrency = Number(prev.currency) + Number(money);
    return User.update({
        currency:newCurrency,
    }, {
        where: {userId: userId}
    })
}

module.exports = {sync, addUser, findUserByUserId, produce, invest, debt, clear, addCurrency};
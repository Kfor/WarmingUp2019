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

var User = sequelize.define('up_stream_user', {
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
    currency: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    debt: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    totalStorageCost: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    T: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    TCost: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    M: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    MCost: {
        type: Sequelize.FLOAT,
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


async function invest(userId, data) {
    const result = await findUserByUserId(userId)
    const prev = result.dataValues
    
    var tmpTCost    = Number(prev.TCost) + Number(data.TInvest);
    var tmpMCost    = Number(prev.MCost) + Number(data.MInvest);
    return User.update({
        TCost:tmpTCost,
        MCost:tmpMCost,
    }, {
        where: {userId: userId}
    })
};

async function produce(userId, data) {
    const result = await findUserByUserId(userId);
    const prev = result.dataValues;
    var tmpChip1Num = Number(prev.chip1Num) + Number(data.chip1Num);
    var tmpChip2Num = Number(prev.chip2Num) + Number(data.chip2Num);
    var tmpChip3Num = Number(prev.chip3Num) + Number(data.chip3Num);
    return User.update({
        chip1Num:tmpChip1Num,
        chip2Num:tmpChip2Num,
        chip3Num:tmpChip3Num,
    }, {
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
 * 根据name查找用户
 */
function findUserByUserId(userId) {
    return User.findOne({
        where:{
            userId: userId
        }
    })
};

function clear(userId) {
    return User.update({
        chip1Num:0,
        chip2Num:0,
        chip3Num:0,
        TCost:0,
        MCost:0,
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

module.exports = {sync, addUser, invest, produce, findUserByUserId, clear, debt, addCurrency}
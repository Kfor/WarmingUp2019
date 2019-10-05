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

var User = sequelize.define('down_stream_user', {
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
    phoneNum: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: []
    },
    totalStroageCost: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    ad: {
        type: Sequelize.FLOAT, //广告投入系数
        allowNull: false,
        defaultValue: 1
    },
    adCost: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },

    currency: {
        type:Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 15000000
    },
    
    debt: {
        type:Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    debtMax: {
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
    timestamps: false
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

/**
 * 广告投入
 */
async function advertise(userId, data) {
    const result = await findUserByUserId(userId);
    const prev = result.dataValues;

    var tmpAdCost = Number(prev.adCost) + Number(data.adInvest);
    var tmpAd = Number(prev.ad)*(1+Number(data.adInvest)/10000000);

    var tmpCurrency = Number(prev.currency) - Number(data.adInvest);
    return User.update({
        adCost: tmpAdCost,
        ad: tmpAd,
        currency: tmpCurrency,
    },{
        where: {userId: userId}
    })
}

/**
 * 售卖手机到市场。注意，这里只针对User进行维护，而没有订单的维护
 */
async function sell(userId, data) {
    const result = await findUserByUserId(userId);
    const phones = result.dataValues.phoneNum;

    var valid = false;
    for(i=0;i<phones.length;i++) {
        if(phones[i].ka==data.ka&&phones[i].kb==data.kb
            &&phones[i].kc==data.kc&&Number(phones[i].amount>=Number(data.amount))) {
                valid = true;
            //    phones[i].amount -= data.amount;
            }
    }

//    if (onePhone == null) 
    if(!valid){
        console.log('Invalid Input!');
        alert('Invalid Input!');
    }
    else {
        // 注意，这里只有User表的维护，没有订单的维护
        return User.update({
            phoneNum: phones,
        }, {
            where: {userId:userId}
        });
    }
}

async function debt(userId, data) {
    const result = await findUserByUserId(userId);
    const prev = result.dataValues;
    var tmpDebt = Number(prev.debt) + Number(data.debt);
    var tmpCurrency = Number(prev.currency) + Number(data.debt);
    return User.update({
        debt: tmpDebt,
        currency: tmpCurrency,
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

function init(userId) {
    return User.update({
        phoneNum:[{ka:2,kb:2,kc:2,amount:100},{ka:1,kb:2,kc:3,amount:100},{ka:2,kb:2,kc:5,amount:200},]
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
};

async function update(userId,data) {
    return User.update({
        phoneNum:data.phoneNum,
        currency:data.currency,
    },{where:{userId:userId}});
}

module.exports = {sync, addUser, findUserByUserId, advertise, sell, debt, clear, init, addCurrency, update};
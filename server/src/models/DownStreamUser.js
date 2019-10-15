// Author: K


const Sequelize = require('sequelize')
const config = require('../config.js')


var round = 1;
var downGroupList = ['group9','group10','group11','group12'];

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
    
    loan: {
        type:Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    loanMax: {
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
    },


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
 * 售卖手机到市场。注意，这里没有实际修改数据，只是判断是否输入合理
 */
async function sell(userId, data) {
    const result = await findUserByUserId(userId);
    const phones = result.dataValues.phoneNum;

    var valid = false;
    for(i=0;i<phones.length;i++) {
        if(phones[i].ka==data.ka&&phones[i].kb==data.kb
            &&phones[i].kc==data.kc&&Number(phones[i].amount>=Number(data.amount))) {
                valid = true;
            }
    }

//    if (onePhone == null) 
    if(!valid){
        console.log('Invalid Input!');
//        alert('Invalid Input!');
        return;
    }
    else {
        return;
    }
}

function getRound() {
    return round;
}

async function loan(userId, data) {
    const result = await findUserByUserId(userId);
    const prev = result.dataValues;
    var tmpLoan = Number(prev.loan) + Number(data.loan);
    var tmpCurrency = Number(prev.currency) + Number(data.loan);
    return User.update({
        loan: tmpLoan,
        currency: tmpCurrency,
    }, {
        where: {userId: userId}
    })
};

async function repay(userId, data) {
    const result = await findUserByUserId(userId);
    const prev = result.dataValues;
    var tmpLoan = Number(prev.loan) - Number(data.repay);
    var tmpCurrency = Number(prev.currency) - Number(data.repay);
    return User.update({
        loan: tmpLoan,
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
};

async function endRound() {
    round += 1;
    console.log('next round: '+round);

    for (var group of downGroupList) {
        var result = await User.findOne({where:{userId:group}});
        var tmpLoan = Number(result.dataValues.loan)*1.1;
        var phones = result.dataValues.phoneNum;
        var sum = 0;
        for (let i in phones) {
            sum += Number(phones[i].amount);
        }
        
        var tmpStorageCost = sum*20;//20是手机库存单价


        User.update({
            loan: tmpLoan, 
            currency: result.dataValues.currency - tmpStorageCost, 
            totalStorageCost: result.dataValues.totalStorageCost + tmpStorageCost,
        },{where:{userId:group}});
    }
};

async function destroy() {
    User.destroy({where:{}});
};

module.exports = {getRound, sync, addUser, findUserByUserId, advertise, sell, loan, clear, init, addCurrency, update, endRound, destroy, repay};
// Author: K


const Sequelize = require('sequelize')
const config = require('../config.js')


var round = 1;
var middleGroupList = ['group5','group6','group7','group8'];


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
        allowNull: false,
        defaultValue: [],
    },

    totalStroageCost: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },

    D: {
        type: Sequelize.FLOAT, //美观度投入系数
        allowNull: false,
        defaultValue: 1
    },
    DCost: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    K: {
        type: Sequelize.FLOAT, //功能性度投入系数
        allowNull: false,
        defaultValue: 1
    },
    KCost: {
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

async function invest(userId, data) {
    const result = await findUserByUserId(userId);
    const prev = result.dataValues;

    var tmpD = (1+Number(data.DInvest)/10000000)*Number(prev.D);
    var tmpK = (1+Number(data.KInvest)/10000000)*Number(prev.K);

    var tmpDCost    = Number(prev.DCost) + Number(data.DInvest);
    var tmpKCost    = Number(prev.KCost) + Number(data.KInvest);

    var tmpCurrency = Number(prev.currency) - Number(data.DInvest) - Number(data.KInvest);

    return User.update({
        D:tmpD,
        K:tmpK,
        DCost:tmpDCost,
        KCost:tmpKCost,
        currency:tmpCurrency,
    },{
        where: {userId: userId}
    })
};

async function produce(userId, data) {
    const result = await findUserByUserId(userId);
    const prev = result.dataValues;

    const D1 = [1,1.1,1.05,0.98];
    const K1 = [1,1.15,0.9,0.95];

    if(data.ka==1) {
        if(data.amount>prev.chip1Num) {
            console.log('超过生产限额');
            return;
        }
    }
    
    if(data.ka==2) {
        if(data.amount>prev.chip2Num) {
            console.log('超过生产限额');
            return;
        }
    }
    
    if(data.ka==3) {
        if(data.amount>prev.chip3Num) {
            console.log('超过生产限额');
            return;
        }
    }

    var DCost = D1[round-1]*(Number(data.kb)*30-Number(prev.D)*20)*7.5 * Number(data.amount);
    var KCost = K1[round-1]*(Number(data.kc)*30-Number(prev.K)*20)*8.5 * Number(data.amount);

    var newPhone = {ka:Number(data.ka),kb:Number(data.kb),kc:Number(data.kc),amount:Number(data.amount)};
    var hasThis = false;
    var newPhones = prev.phoneNum;

    for(var i=0;i<newPhones.length;i++) {
        if(newPhones[i].ka==data.ka&&
            newPhones[i].kb==data.kb&&
            newPhones[i].kc==data.kc) {
                newPhones[i].amount += Number(data.amount);
                hasThis = true;
                break;
            }
    }

    if(!hasThis) {
        newPhones.push(newPhone);
    }

    var newChip1 = prev.chip1Num;
    var newChip2 = prev.chip2Num;
    var newChip3 = prev.chip3Num;

    if(data.ka==1) {
        newChip1 -= data.amount;
    }
    if(data.ka==2) {
        newChip2 -= data.amount;
    }
    if(data.ka==3) {
        newChip3 -= data.amount;
    }

    return User.update({
        currency: prev.currency - DCost - KCost,
        chip1Num: newChip1,
        chip2Num: newChip2,
        chip3Num: newChip3,
        phoneNum: newPhones,
    },{
        where: {userId: userId}
    })
};


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
        chip1Num:data.chip1Num,
        chip2Num:data.chip2Num,
        chip3Num:data.chip3Num,
        phoneNum:data.phoneNum,
        currency:data.currency,
    },{where:{userId:userId}});
};

async function endRound() {
    round += 1;
    console.log('next round: '+round);

    for (var group of middleGroupList) {
        var result = await User.findOne({where:{userId:group}});
        var tmpLoan = Number(result.dataValues.loan)*1.1;
        User.update({loan: tmpLoan},{where:{userId:group}});
    }
};

async function destroy() {
    User.destroy({where:{}});
};


module.exports = {sync, addUser, findUserByUserId, produce, invest, loan, clear, addCurrency, update, endRound, destroy, repay};
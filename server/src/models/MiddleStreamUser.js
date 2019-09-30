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
        defaultValue: 1
    },
    MCost: {
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

    var tmpM = (1+Number(data.MInvest)/10000000)*Number(prev.M);
    var tmpK = (1+Number(data.KInvest)/10000000)*Number(prev.K);

    var tmpMCost    = Number(prev.MCost) + Number(data.MInvest);
    var tmpKCost    = Number(prev.KCost) + Number(data.KInvest);

    return User.update({
        M:tmpM,
        K:tmpK,
        MCost:tmpMCost,
        KCost:tmpKCost,
    },{
        where: {userId: userId}
    })
};

async function produce(userId, data) {
    const result = await findUserByUserId(userId);
    const prev = result.dataValues;

    if(data.ka==1) {
        if(data.amount>prev.chip1Num) {
            alert('超过生产限额！');
            console.log('超过生产限额');
        }
    }
    
    if(data.ka==2) {
        if(data.amount>prev.chip2Num) {
            alert('超过生产限额！');
            console.log('超过生产限额');
        }
    }
    
    if(data.ka==3) {
        if(data.amount>prev.chip3Num) {
            alert('超过生产限额！');
            console.log('超过生产限额');
        }
    }

    var MCost = (Number(data.kb)*30-Number(prev.M)*20)*7.5 * data.amount;
    var KCost = (Number(data.kc)*30-Number(prev.K)*20)*8.5 * data.amount;

    var newPhone = {ka:data.ka,kb:data.kb,kc:data.kc,amount:data.amount};
    var hasThis = false;
    var newPhones = prev.phoneNum;
    for(var i=0;i<newPhones.length;i++) {
        if(newPhones[i].ka==data.ka&&
            newPhones[i].kb==data.kb&&
            newPhones[i].kc==data.kc) {
                newPhones[i].amount += data.amount;
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
        currency: prev.currency - MCost - KCost,
        chip1Num: newChip1,
        chip2Num: newChip2,
        chip3Num: newChip3,
        phoneNum: newPhones,
    },{
        where: {userId: userId}
    })
};


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
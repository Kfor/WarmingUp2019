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
        defaultValue: 15000000
    },
    debt: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    debtMax: {
        type:Sequelize.FLOAT,
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
        defaultValue: 1
    },
    TCost: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    M: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 1
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
    const result = await findUserByUserId(userId)
    const prev = result.dataValues

    var tmpT = (1-Number(data.TInvest)/10000000)*Number(prev.T);
    var tmpM = (1-Number(data.MInvest)/10000000)*Number(prev.M);

    var tmpTCost    = Number(prev.TCost) + Number(data.TInvest);
    var tmpMCost    = Number(prev.MCost) + Number(data.MInvest);

    var tmpCurrency = Number(prev.currency) - Number(data.TInvest) - Number(data.MInvest);


    return User.update({
        T:tmpT,
        M:tmpM,
        TCost:tmpTCost,
        MCost:tmpMCost,
        currency:tmpCurrency,
    }, {
        where: {userId: userId}
    })
};

async function produce(userId, data) { //上游需要一次性输入
    const result = await findUserByUserId(userId);
    const prev = result.dataValues;

    const It = [1.0,0.9,1.08,1.1];//芯片成本事件
    const Im = [1,1.05,1.0,1.1];//最大生产系数
    const fN = [1000,500,200];//基础产量
    const fC = [100,300,800];//基础成本
    const round = data.round-1;//index从0开始

    var Max1 = Im[round] * fN[0] * prev.M;
    var Max2 = Im[round] * fN[1] * prev.M;
    var Max3 = Im[round] * fN[2] * prev.M;

    var chip1Num = data.chip1Num;
    var chip2Num = data.chip2Num;
    var chip3Num = data.chip3Num;

    if(chip1Num>Max1||chip2Num>Max2||chip3Num>Max3) {
        // alert('超过生产限额，置位最大值');
        console.log('超过生产限额, 置为最大值');
    }
    if(chip1Num>Max1) {
        chip1Num = Max1;
    }
    if(chip2Num>Max2) {
        chip2Num = Max2;
    }
    if(chip3Num>Max3) {
        chip3Num = Max3;
    }
    
    var tmpChip1Num = Number(prev.chip1Num) + Number(chip1Num);
    var tmpChip2Num = Number(prev.chip2Num) + Number(chip2Num);
    var tmpChip3Num = Number(prev.chip3Num) + Number(chip3Num);
    
    var Cost1 = It[round] * fC[0] * Number(prev.T) * Number(chip1Num);
    var Cost2 = It[round] * fC[1] * Number(prev.T) * Number(chip2Num);
    var Cost3 = It[round] * fC[2] * Number(prev.T) * Number(chip3Num);

    var totalCost = Number(Cost1) + Number(Cost2) + Number(Cost3);
    var newCurrency = Number(prev.currency) - Number(totalCost);

    if(newCurrency<0) {
        console.log('余额不足！交易失败');
        return;
    }

    return User.update({
        chip1Num:tmpChip1Num,
        chip2Num:tmpChip2Num,
        chip3Num:tmpChip3Num,
        currency:newCurrency,
    }, {
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
        T:1,
        MCost:0,
        M:1,
        currency:15000000,
    }, {
        where: {userId: userId}
    })
};

async function addCurrency(userId,money) {
    const result = await findUserByUserId(userId);
    const prev = result.dataValues;
    var tmpCurrency = Number(prev.currency) + Number(money);
    return User.update({
        currency: tmpCurrency,
    }, {
        where: {userId: userId}
    })
};

async function update(userId,data) {
    return User.update({
        chip1Num:data.chip1Num,
        chip2Num:data.chip2Num,
        chip3Num:data.chip3Num,
        currency:data.currency,
    },{where:{userId:userId}});
}

module.exports = {sync, addUser, invest, produce, findUserByUserId, clear, debt, addCurrency, update}
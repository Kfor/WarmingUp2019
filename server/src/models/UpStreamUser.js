const Sequelize = require('sequelize')
const config = require('../config.js')


var round = 1;
var upGroupList = ['group1','group2','group3','group4'];


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
    loan: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    loanMax: {
        type:Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 1000000
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
    thisProfit: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
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
    const result = await findUserByUserId(userId)
    const prev = result.dataValues

    //var tmpT = (1-Number(data.TInvest)/10000000)*Number(prev.T);
    //var tmpM = (1-Number(data.MInvest)/10000000)*Number(prev.M);

    var tmpTCost    = Number(prev.TCost) + Number(data.TInvest);
    var tmpMCost    = Number(prev.MCost) + Number(data.MInvest);

    var tmpT = 0.4 + 0.6/Number(1+Math.exp(3*(tmpTCost/6000000-1.6)));
    var tmpM = 1 + 4/Number(1+Math.exp(2*(2-tmpMCost/6000000)));

    var tmpCurrency = Number(prev.currency) - Number(data.TInvest) - Number(data.MInvest);
    var tmpProfit = Number(prev.thisProfit) - Number(data.TInvest) - Number(data.MInvest);
    console.log(tmpCurrency)


    return User.update({
        T:tmpT,
        M:tmpM,
        TCost:tmpTCost,
        MCost:tmpMCost,
        currency:tmpCurrency,
        thisProfit:tmpProfit,
    }, {
        where: {userId: userId}
    })
};

async function produce(userId, data) { //上游需要一次性输入
    const result = await findUserByUserId(userId);
    const prev = result.dataValues;

    const It = [1.0,0.9,1.08,1.1];//芯片成本事件
    const Im = [1,1.05,0.9,1.1];//最大生产系数
    const fN = [5000,3000,1500];//基础产量
    const fC = [300,800,1500];//基础成本
    const tmpRound = round-1;//index从0开始

    var Max1 = Im[tmpRound] * fN[0] * prev.M;
    var Max2 = Im[tmpRound] * fN[1] * prev.M;
    var Max3 = Im[tmpRound] * fN[2] * prev.M;

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
    
    var Cost1 = It[tmpRound] * fC[0] * Number(prev.T) * Number(chip1Num);
    var Cost2 = It[tmpRound] * fC[1] * Number(prev.T) * Number(chip2Num);
    var Cost3 = It[tmpRound] * fC[2] * Number(prev.T) * Number(chip3Num);

    var totalCost = Number(Cost1) + Number(Cost2) + Number(Cost3);
    var newCurrency = Number(prev.currency) - Number(totalCost);
    var tmpProfit = Number(prev.thisProfit) - Number(data.TInvest) - Number(data.MInvest);

    if(newCurrency<0) {
        console.log('余额不足！交易失败');
        return;
    }

    return User.update({
        chip1Num:tmpChip1Num,
        chip2Num:tmpChip2Num,
        chip3Num:tmpChip3Num,
        currency:newCurrency,
        thisProfit:tmpProfit,
    }, {
        where: {userId: userId}
    })
};

async function loan(userId, data) {
    const result = await findUserByUserId(userId);
    const prev = result.dataValues;
    if(Number(data.loan)<Number(prev.loanMax)) {
        var tmpLoan = Number(prev.loan) + Number(data.loan);
        var tmpCurrency = Number(prev.currency) + Number(data.loan);
        return User.update({
            loan: tmpLoan,
            loanMax: Number(prev.loanMax) - tmpLoan,
            currency: tmpCurrency,
        }, {
            where: {userId: userId}
        });
    }
    else {
        console.log('超过借贷上限');
    }
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
};


async function endRound() {
    round += 1;
    console.log('next round: '+round);

    for (var group of upGroupList) {
        var result = await User.findOne({where:{userId:group}});
        var tmpLoan = Number(result.dataValues.loan)*1.1;
        var tmpStorageCost = Number(result.dataValues.chip1Num+
            result.dataValues.chip2Num+result.dataValues.chip3Num)*10;//10是每个芯片库存单价
        

        User.update({
            loan: tmpLoan, 
            currency: result.dataValues.currency - tmpStorageCost, 
            totalStorageCost: result.dataValues.totalStorageCost + tmpStorageCost,
            thisProfit: 0,//每到一轮，就要置位0
            lastProfit: Number(result.thisProfit),
        },{where:{userId:group}});
    }
};

async function updateLoanMax(data) {
    for (var group of upGroupList) {
        var result = await User.findOne({where:{userId:group}});
        for(let i in data) {
            if(data[i].userId==result.dataValues.userId) {
                var tmpLoanMax = data[i].loanMax;
                break;
            }
        }

        User.update({
            rank: data.rank,
            loanMax: tmpLoanMax,
        },{where:{userId:group}});
    }
};

async function destroy() {
    User.destroy({where:{}});
};


module.exports = {sync, addUser, invest, produce, findUserByUserId, clear, loan, addCurrency, update, endRound, updateLoanMax, destroy, repay}
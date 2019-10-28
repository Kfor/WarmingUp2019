const Sequelize = require('sequelize')
const config = require('../config.js')
const Round = require('./Round')



var upGroupList = ['group1','group2','group3'];
const fN = [10000,8000,3000];


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
        defaultValue: 12000000
    },
    loan: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    loanMax: {
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
    Max1: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 10000,
    },
    Max2: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 8000,
    },
    Max3: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 3000,
    },
    MCost: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    rank: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },

    
    // angelInvest: {//初始资金，用于天使投资计算利润率用
    //     type:Sequelize.FLOAT,
    //     defaultValue: 0
    // },
    // thisProfit: {
    //     type: Sequelize.FLOAT,
    //     defaultValue: 0,
    // },
    // lastProfit: {//上一轮的利润
    //     type:Sequelize.FLOAT,
    //     defaultValue: 0
    // },
    // angelCut: {//天使投资人收的股权。如果对赌成功，则为0
    //     type:Sequelize.FLOAT,
    //     defaultValue: -1
    // },
    
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

    var tmpT = 0.4 + 0.6/Number(1+Math.exp(8*(tmpTCost/10000000-0.4)));
    var tmpM = 0.45 + 4.55/Number(1+Math.exp(3.5*(0.55-tmpMCost/10000000)));


    var roundtable = await Round.getRound();
    var round = roundtable.dataValues.round;
    const Im = [1,1.05,0.9,1.1];//最大生产系数
    //const fN = [10000,8000,3000];//基础产量
    const tmpRound = round-1;//index从0开始
    
    var Max1 = Math.floor(Im[tmpRound] * fN[0] * tmpM);
    var Max2 = Math.floor(Im[tmpRound] * fN[1] * tmpM);
    var Max3 = Math.floor(Im[tmpRound] * fN[2] * tmpM);


    var tmpCurrency = Number(prev.currency) - Number(data.TInvest) - Number(data.MInvest);
    // var tmpProfit = Number(prev.thisProfit) - Number(data.TInvest) - Number(data.MInvest);

    var valid = tmpCurrency>=0;
    if(valid){
        User.update({
            T:tmpT,
            M:tmpM,
            Max1:Max1,
            Max2:Max2,
            Max3:Max3,
            TCost:tmpTCost,
            MCost:tmpMCost,
            currency:tmpCurrency,
            //thisProfit:tmpProfit,
        }, {
            where: {userId: userId}
        })
    }
    return valid;
};

async function produce(userId, data) { //上游需要一次性输入

    const result = await findUserByUserId(userId);
    const prev = result.dataValues;

    var roundtable = await Round.getRound();
    var round = roundtable.dataValues.round;
    const It = [1.0,0.9,1.08,1.1];//芯片成本事件
    const fC = [300,800,1500];//基础成本
    const tmpRound = round-1;//index从0开始
    
    var Max1 = prev.Max1;
    var Max2 = prev.Max2;
    var Max3 = prev.Max3;

    var chip1Num = data.chip1Num;
    var chip2Num = data.chip2Num;
    var chip3Num = data.chip3Num;

    var validFlag = 0;
    if(chip1Num>Max1||chip2Num>Max2||chip3Num>Max3) {
        validFlag = 2;
        return validFlag;
    }
    
    var tmpChip1Num = Number(prev.chip1Num) + Number(chip1Num);
    var tmpChip2Num = Number(prev.chip2Num) + Number(chip2Num);
    var tmpChip3Num = Number(prev.chip3Num) + Number(chip3Num);

    Max1 -= Number(chip1Num);
    Max2 -= Number(chip2Num);
    Max3 -= Number(chip3Num);
    
    var Cost1 = It[tmpRound] * fC[0] * Number(prev.T) * Number(chip1Num);
    var Cost2 = It[tmpRound] * fC[1] * Number(prev.T) * Number(chip2Num);
    var Cost3 = It[tmpRound] * fC[2] * Number(prev.T) * Number(chip3Num);

    var totalCost = Number(Cost1) + Number(Cost2) + Number(Cost3);
    var newCurrency = Number(prev.currency) - Number(totalCost);
    var tmpProfit = Number(prev.thisProfit) - Number(data.TInvest) - Number(data.MInvest);

    if(newCurrency<0) {
        validFlag = 1;
        return validFlag;
    }
    
    User.update({
        Max1:Max1,
        Max2:Max2,
        Max3:Max3,
        chip1Num:tmpChip1Num,
        chip2Num:tmpChip2Num,
        chip3Num:tmpChip3Num,
        currency:newCurrency,
        //thisProfit:tmpProfit,
    }, {
        where: {userId: userId}
    });
    return validFlag;
};

async function loan(userId, data) {
    const result = await findUserByUserId(userId);
    const prev = result.dataValues;
    var valid = true;
    if (Number(data.loan) <= Number(prev.loanMax)) {
        var tmpLoan = Number(prev.loan) + Number(data.loan);
        var tmpCurrency = Number(prev.currency) + Number(data.loan);
        
        User.update({
            loan: tmpLoan,
            loanMax: Number(prev.loanMax) - Number(data.loan),
            currency: tmpCurrency,
        }, {
            where: { userId: userId }
        });
    }
    else {
        valid = false;
    }
    return valid;
};

async function repay(userId, data) {
    const result = await findUserByUserId(userId);
    const prev = result.dataValues;
    if(data.repay>prev.loan)
        data.repay = prev.loan;
    var tmpLoan = Number(prev.loan) - Number(data.repay);
    var tmpCurrency = Number(prev.currency) - Number(data.repay);
    var valid = tmpCurrency>=0;
    if (valid) {
        User.update({
            loan: tmpLoan,
            currency: tmpCurrency,
        }, {
            where: { userId: userId }
        })
    };
    return valid;
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
        //thisProfit:data.thisProfit,
        //angelCut:data.angelCut,
    },{where:{userId:userId}});
};

async function endGame() {//用来还钱
    for(let group of upGroupList) {
        var result = await User.findOne({where:{userId:group}});
        var tmpLoan = Number(result.dataValues.loan);
        User.update({
            loan: 0,
            currency: Number(result.dataValues.currency - tmpLoan)
        },{where:{userId:group}});
    }
};

async function endRound() {
    
    var roundtable = await Round.getRound();
    var round = roundtable.dataValues.round;
    const Im = [1,1.05,0.9,1.1];//最大生产系数
    //const fN = [10000,8000,3000];//基础产量
    const tmpRound = round;//新的一轮（而原本要下标减一）
    

    for (var group of upGroupList) {
        var result = await User.findOne({where:{userId:group}});
        var tmpLoan = Number(result.dataValues.loan)*1.1;
        var tmpStorageCost = Number(result.dataValues.chip1Num+
            result.dataValues.chip2Num+result.dataValues.chip3Num)*40;//40是每个芯片库存单价
    

        var Max1 = Math.floor(Im[tmpRound] * fN[0] * result.M);
        var Max2 = Math.floor(Im[tmpRound] * fN[1] * result.M);
        var Max3 = Math.floor(Im[tmpRound] * fN[2] * result.M);

        User.update({
            Max1:Max1,
            Max2:Max2,
            Max3:Max3,
            loan: tmpLoan, 
            currency: result.dataValues.currency - tmpStorageCost, 
            totalStorageCost: result.dataValues.totalStorageCost + tmpStorageCost,
            //thisProfit: 0,//每到一轮，就要置位0
            //lastProfit: Number(result.thisProfit),
        },{where:{userId:group}});
    }
};

async function updateLoanMax(data) {
    for (var group of upGroupList) {
        var result = await User.findOne({where:{userId:group}});
        for(let i in data) {
            if(data[i].userId==result.dataValues.userId) {
                var tmpLoanMax = data[i].loanMax;
                var tmpRank = data[i].rank;
                break;
            }
        }

        User.update({
            rank: tmpRank,
            loanMax: tmpLoanMax,
        },{where:{userId:group}});
    }
};

async function destroy() {
    User.destroy({where:{}});
};

function autoFine(userId) {
    addCurrency(userId,-200000);
};

module.exports = { endGame, autoFine, sync, addUser, invest, produce, findUserByUserId, clear, loan, addCurrency, update, endRound, updateLoanMax, destroy, repay}
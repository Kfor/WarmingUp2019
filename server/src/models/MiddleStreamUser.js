// Author: K


const Sequelize = require('sequelize')
const config = require('../config.js')
const Round = require('./Round')


var middleGroupList = ['group5','group6','group7','group8','group9'];


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

    totalStorageCost: {
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
        defaultValue: 12000000
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
    const result = await findUserByUserId(userId);
    const prev = result.dataValues;

    // var tmpD = (1+Number(data.DInvest)/10000000)*Number(prev.D);
    // var tmpK = (1+Number(data.KInvest)/10000000)*Number(prev.K);

    var tmpDCost    = Number(prev.DCost) + Number(data.DInvest);
    var tmpKCost    = Number(prev.KCost) + Number(data.KInvest);

    var tmpD = 0.4 + 0.6/Number(1+Math.exp(8*(tmpDCost/10000000-0.4)));
    var tmpK = 0.4 + 0.6/Number(1+Math.exp(8*(tmpKCost/10000000-0.4)));

    var tmpCurrency = Number(prev.currency) - Number(data.DInvest) - Number(data.KInvest);
    var tmpProfit = Number(prev.thisProfit) - Number(data.DInvest) - Number(data.KInvest);
    
    var valid = tmpCurrency>=0;

    if(valid){
        User.update({
            D:tmpD,
            K:tmpK,
            DCost:tmpDCost,
            KCost:tmpKCost,
            currency:tmpCurrency,
            //thisProfit:tmpProfit,
        },{
            where: {userId: userId}
        });
    }
    return valid;
};

async function produce(userId, data) {
    var roundtable = await Round.getRound()
    var round = roundtable.dataValues.round;
    var validFlag = 0;

    const result = await findUserByUserId(userId);
    const prev = result.dataValues;

    const D1 = [1,1.1,1.05,0.98,0];
    const K1 = [1,1.15,0.9,0.95,0];
    const DFund = [150,350,550];
    const KFund = [150,450,750];

    if(data.ka==1) {
        if(data.amount>prev.chip1Num) {
            validFlag = 2;
            return validFlag;
        }
    }
    
    if(data.ka==2) {
        if(data.amount>prev.chip2Num) {
            validFlag = 2;
            return validFlag;
        }
    }
    
    if(data.ka==3) {
        if(data.amount>prev.chip3Num) {
            validFlag = 2;
            return validFlag;
        }
    }

    // console.log(D1[round-1]);
    // console.log(prev.D);

    // console.log(K1[round-1]);
    // console.log(prev.K);
    // console.log(data.amount);

    var DCost = D1[round-1]*Number(prev.D)* Number(data.amount)*Number(DFund[data.kb-1]);
    var KCost = K1[round-1]*Number(prev.K)* Number(data.amount)*Number(KFund[data.kc-1]);

    var newPhone = {ka:Number(data.ka),kb:Number(data.kb),kc:Number(data.kc),amount:Number(data.amount)};
    var hasThis = false;
    var newPhones = prev.phoneNum;

    for(var i=0;i<newPhones.length;i++) {
        if(newPhones[i].ka==data.ka&&
            newPhones[i].kb==data.kb&&
            newPhones[i].kc==data.kc) {
                newPhones[i].amount = Number(newPhones[i].amount) + Number(data.amount);
                hasThis = true;
                break;
            }
    }

    if(!hasThis) {
        newPhones.push(newPhone);
    }

    // console.log(newPhones)
    // console.log(prev.currency)
    var newChip1 = prev.chip1Num;
    var newChip2 = prev.chip2Num;
    var newChip3 = prev.chip3Num;

    if(data.ka==1) {
        newChip1 = newChip1 - Number(data.amount);
    }
    if(data.ka==2) {
        newChip2 = newChip2 - Number(data.amount);
    }
    if(data.ka==3) {
        newChip3 = newChip3 - Number(data.amount);
    }

    var tmpCurrency = Number(prev.currency) - Number(DCost) - Number(KCost);
    if(tmpCurrency<0) {
        validFlag = 1;
        return validFlag;
    }
    //var tmpProfit = 
    //Number(prev.thisProfit) - 
    // Number(data.DInvest) - Number(data.KInvest);
    // console.log('DCost',DCost);
    // console.log('KCost',KCost);

    User.update({
        currency: tmpCurrency,
        chip1Num: newChip1,
        chip2Num: newChip2,
        chip3Num: newChip3,
        phoneNum: newPhones,
        //thisProfit: tmpProfit,
    },{
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
        //thisProfit:data.thisProfit,
        //angelCut:data.angelCut,
    },{where:{userId:userId}});
};

async function endRound() {
    for (var group of middleGroupList) {
        var result = await User.findOne({where:{userId:group}});
        var tmpLoan = Number(result.dataValues.loan)*1.1;
        var phones = result.dataValues.phoneNum;
        var sum = 0;
        for (let i in phones) {
            sum = Number(sum) + Number(phones[i].amount);
        }

        var tmpStorageCost = Number(result.dataValues.chip1Num+
            result.dataValues.chip2Num+result.dataValues.chip3Num)*40+
            sum*100;//40是每个芯片库存单价,100是手机库存单价
        

            User.update({
                loan: tmpLoan, 
                currency: result.dataValues.currency - tmpStorageCost, 
                totalStorageCost: result.dataValues.totalStorageCost + tmpStorageCost,
                //thisProfit: 0,//每到一轮，就要置位0
                //lastProfit: Number(result.thisProfit),   
            },{where:{userId:group}});    
        }
};

async function endGame() {//用来还钱
    for(let group of middleGroupList) {
        var result = await User.findOne({where:{userId:group}});
        var tmpLoan = Number(result.dataValues.loan);
        User.update({
            loan: 0,
            currency: Number(result.dataValues.currency - tmpLoan)
        },{where:{userId:group}});
    }
};

async function updateLoanMax(data) {
    for (var group of middleGroupList) {
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

module.exports = {endGame, autoFine, sync, addUser, findUserByUserId, produce, invest, loan, clear, addCurrency, update, updateLoanMax, endRound, destroy, repay};
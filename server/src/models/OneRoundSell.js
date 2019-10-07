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

var OneRoundSell = sequelize.define('one_round_sell', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    round: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false,
    },
    ka: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    kb: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    kc: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },      
}, {
    freezeTableName: true, // use singular table name
    timestamps: false
});

/**
 * 同步或更新数据库
 */
function sync() {
    OneRoundSell.sync({alter:true});
};

/**
 * 添加一个下游到市场的订单
 */
function addOneRoundSell(userId,data) {
    return OneRoundSell.create({
        userId: userId,
        round: data.round,
        ka: data.ka,
        kb: data.kb,
        kc: data.kc,
        price: data.price,
        amount: data.amount,
    });

};

function getAllSell(round) {
    return OneRoundSell.findAll({
        where:{
            round:round,
        }
    })
};


var marketMcoef = [[1,1,1],
                [0.5,1,0.5],
                [1,0.3,0.7],
                [1,0.2,0.3],
                [0.3,0.3,0.5]];

var marketPcoef = [[3,3,3],
                [2,3,2.5],
                [3,1.5,2.5],
                [3,1,1.5],
                [1,1,1.5]];

var priceExpect = [7000,5000,4000,3000,1000];

var MarketCapacity = [[4000,5000,5000,4000,10000],//第一年
                    [5000,6500,6500,5000,12000],
                    [5800,7200,7200,5800,14400],
                    [6900,8600,8600,6900,19000]];
                        

function preferValue(ka,kb,kc,marketType) {
    // 即为文档中的f
    if (marketType<0) 
        return -1;
    var thisM = marketMcoef[marketType];
    var thisP = marketPcoef[marketType];
    var tmp = thisM[0]*Math.abs(thisP[0]-ka) +
                thisM[1]*Math.abs(thisP[1]-kb) + 
                thisM[2]*Math.abs(thisP[2]-kc) + 1;
    console.log('f'+1/tmp)
    return 1/tmp;
}

function competitionValue(ad,ka,kb,kc,priceActual,marketType) {
    // 即为文档中的g
    return ad*preferValue(ka,kb,kc,marketType)*priceExpect[marketType]/priceActual;
}

function calSumOfCompValue(input, indexList, num) {
    // 计算各个玩家的g之和
    var sum = 0;
    for (var i=0;i<num;i++) {
        sum += input[indexList[i]].compValue;
    }
    return sum;
}

/** 下游逻辑操作代码，直接调用distributeMarket(turn, oneTurnInputJSON)即可。
* 调用完毕后会返回额外附加actualMarket值的JSON
*/
function distributeMarket(turn, oneTurnInputJSON) {
    var MarketThisTurn = MarketCapacity[turn-1];

    var marketTypeIndex = [[],[],[],[],[]]

    var oneTurnInput = oneTurnInputJSON;
    console.log(oneTurnInput);

    for(var i=0;i<oneTurnInput.length;i++) {// 对于每一个产品
        var max = 0;
        var actualMarketType = 0;
        var tmpValueF = 0;
        var ad = oneTurnInput[i].ad;
        var ka = oneTurnInput[i].ka;
        var kb = oneTurnInput[i].kb;
        var kc = oneTurnInput[i].kc;
        var priceActual = oneTurnInput[i].price;

        for(var j=0;j<5;j++) {//5 是市场类型数目
            tmpValueF = preferValue(ka,kb,kc,j);
            if (tmpValueF>max) {
                max = tmpValueF;
                actualMarketType = j;
            }
        }

        oneTurnInput[i]['f'] = max;
        oneTurnInput[i]['marketType'] = actualMarketType;//实际的细分市场类型
        oneTurnInput[i]['compValue'] = competitionValue(ad,ka,kb,kc,priceActual,actualMarketType);//在这个细分市场下的竞争力
        marketTypeIndex[Number(actualMarketType)].push(Number(i));
    }

    for(var i=4;i>=0;i--) {// 5是市场类型数目
        
        var typeNum = marketTypeIndex[i].length;
        var mThisTurnType = MarketThisTurn[i];
        var sumOfComp = calSumOfCompValue(oneTurnInput,marketTypeIndex[i],typeNum);
        var k0 = 1.3;//为了显示龙头效应的系数
        
        for(var j=0;j<typeNum;j++) {//对于每种手机，都需要一次重新计算市场占比
            var index = marketTypeIndex[i][j];
            var thisComp = oneTurnInput[index]['compValue'];
            var sellValue = oneTurnInput[index]['amount'];
            var ad = oneTurnInput[index]['ad'];
            var thisActualMarket = Math.ceil(ad*mThisTurnType*Math.pow(thisComp,k0)/Math.pow(sumOfComp,k0));

            if(thisActualMarket > sellValue) { // 如果应该分配的大于产量，则卖出数量即为应该量
                thisActualMarket = sellValue;
            }

            if(mThisTurnType <= thisActualMarket) {//如果剩下的市场不足以支撑应该分配的市场
                thisActualMarket = mThisTurnType;
                oneTurnInput[index]['actualMarket'] = thisActualMarket;

                for(var kidx=j+1;kidx<typeNum;kidx++) {// 将之后的手机都归类到下一级市场。注意只会下沉
                    if(i==0)
                        break;
                    marketTypeIndex[i-1].push(marketTypeIndex[i][kidx]);
                }
                break;
            }

            oneTurnInput[index]['actualMarket'] = thisActualMarket;
            
            sumOfComp -= thisComp;
            mThisTurnType -= thisActualMarket;
        }
    }
    console.log(oneTurnInput)
    return oneTurnInput;
}


async function destroy() {
    OneRoundSell.destroy({where:{}}); 
}

module.exports = {sync, addOneRoundSell, getAllSell, distributeMarket, destroy};
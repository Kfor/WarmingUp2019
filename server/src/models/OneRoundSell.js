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
                [0.7,0.3,1],
                //[1,0.2,0.3],
                [0.3,0.3,0.5]];

var marketPcoef = [[3,3,3],
                [2,3,2.5],
                //[3,1.5,2.5],
                //[3,1,1.5],
                [2,1.5,2.5],
                [1,1,1.5]];

//var priceExpect = [6000,4000,3000,5000,1500];
var priceExpect = [6000,4000,3000,1500];

// var MarketCapacity = [[4000,5000,5000,4000,10000],//第一年
//                     [5000,6500,6500,5000,12000],
//                     [5800,7200,7200,5800,14400],
//                     [6900,8600,8600,6900,19000]];
                        

var MarketCapacity = [[3000,5000,4000,10000],//第一年
                    [3500,6000,4400,10300],
                    [4000,6800,5000,10800],
                    [4500,7300,5500,12000]];

function preferValue(ka,kb,kc,marketType) {
    // 即为文档中的f
    if (marketType<0) 
        return -1; 
    var thisM = marketMcoef[marketType];
    var thisP = marketPcoef[marketType];
    var tmp = thisM[0]*Math.abs(thisP[0]-ka) +
                thisM[1]*Math.abs(thisP[1]-kb) + 
                thisM[2]*Math.abs(thisP[2]-kc) + 1;
    return 1/tmp;
}

function competitionValue(ad,ka,kb,kc,priceActual,marketType) {
    // 即为文档中的g
    return ad*preferValue(ka,kb,kc,marketType)*priceExpect[marketType]/priceActual;
}

function calSumOfCompValue(input, indexList, num) {
    // 计算各个玩家的g之和
    var k0 = 1.3;
    var sum = 0;
    for (var i=0;i<num;i++) {
        sum = Number(sum) + Math.pow(Number(input[Math.abs(indexList[i])].compValue),k0);
    }
    return sum;
}

/** 下游逻辑操作代码，直接调用distributeMarket(turn, oneTurnInputJSON)即可。
* 调用完毕后会返回额外附加actualMarket值的JSON
*/
function distributeMarket(turn, oneTurnInputJSON) {
    var MarketThisTurn = MarketCapacity[turn-1];

    var marketTypeIndex = [[],[],[],[]]

    var oneTurnInput = oneTurnInputJSON;

    for(var i=0;i<oneTurnInput.length;i++) {// 对于每一个产品
        var max = 0;
        var actualMarketType = 0;
        var tmpValueF = 0;
        var ad = oneTurnInput[i].ad;
        var ka = oneTurnInput[i].ka;
        var kb = oneTurnInput[i].kb;
        var kc = oneTurnInput[i].kc;
        var priceActual = oneTurnInput[i].price;

        for(var j=0;j<4;j++) {//4 是市场类型数目
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
    console.log('oneTurnInput----',oneTurnInput);
    


    for(var i=0;i<4;i++) {// 4是市场类型数目
        
        var typeNum = marketTypeIndex[i].length;
        if(typeNum==0) continue;
        var mThisTurnType = MarketThisTurn[i];
        console.log('marketThis',MarketThisTurn[i])
        var sumOfComp = calSumOfCompValue(oneTurnInput,marketTypeIndex[i],typeNum);
        var k0 = 1.3;//为了显示龙头效应的系数

        var indexList = new Array(typeNum);//用于按照竞争力大小排序
        indexList[0] = Number(0);
        console.log('marketType------',marketTypeIndex[i]);
        for(let j=1;j<typeNum;j++) {
            var index = Math.abs(marketTypeIndex[i][j]);
            var thisComp = oneTurnInput[index]['compValue'];
            console.log('one',index,thisComp,indexList)
            

            for(var indexInList=j-1;indexInList>=0;indexInList--) {
                
                var indexThis = Math.abs(marketTypeIndex[i][indexInList]);
                var thisCompThis = oneTurnInput[indexThis]['compValue'];
                console.log('in',indexThis,thisCompThis)

                if(thisComp>thisCompThis) {
                    indexList[Number(indexInList)+1] = indexList[indexInList];
                }
                else{
                    break;
                }
            }
            indexList[Number(indexInList)+1] = j;
            
        }
        console.log('indexList------',indexList);
        console.log('marketType-----',marketTypeIndex[i]);
        
        for(var k=0;k<typeNum;k++) {//对于每种手机，都需要一次重新计算市场占比
            var j = indexList[k];
            var index = Math.abs(marketTypeIndex[i][Number(j)]);
            console.log('index----',index,j);
            var thisComp = oneTurnInput[index]['compValue'];
            var sellValue = oneTurnInput[index]['amount'];
            var ad = oneTurnInput[index]['ad'];
            var thisActualMarket = Math.ceil(mThisTurnType*Math.pow(thisComp,k0)/sumOfComp);
            
            if(Number(oneTurnInput[index].price)>Number(2*priceExpect[i])){
                oneTurnInput[index]['actualMarket'] = 0;
                continue;
            }
                

            if(thisActualMarket > sellValue) { // 如果应该分配的大于产量，则卖出数量即为应该量
                thisActualMarket = sellValue;
            }

            if(mThisTurnType <= thisActualMarket) {//如果剩下的市场不足以支撑应该分配的市场
                thisActualMarket = mThisTurnType;
                oneTurnInput[index]['actualMarket'] = thisActualMarket;

                for(var kidx=j+1;kidx<typeNum;kidx++) {// 将其之后的手机都归类到下一级市场。注意只会下沉
                    if(i==3) // 最后一级就不会再下沉了
                        break;
                    if(marketTypeIndex[i][kidx]>0){
                        marketTypeIndex[i][kidx] *= -1; //这里的符号是为了保证下沉只会发生一次
                        marketTypeIndex[i+1].push(marketTypeIndex[i][kidx]);
                    }
                }
                break;
            }

            oneTurnInput[index]['actualMarket'] = thisActualMarket;
            //if(j<typeNum-1)
            //    sumOfComp = Number(sumOfComp) - Number(thisComp);//在最后两种的时候就不比较了
            //mThisTurnType = Number(mThisTurnType) - Number(thisActualMarket);
        }
    }
    console.log('oneTurn',oneTurnInput)
    console.log('market',marketTypeIndex)
    return oneTurnInput;
}


async function destroy() {
    OneRoundSell.destroy({where:{}}); 
}

module.exports = {sync, addOneRoundSell, getAllSell, distributeMarket, destroy};
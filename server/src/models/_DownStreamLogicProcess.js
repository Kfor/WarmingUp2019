// 下游逻辑操作代码，直接调用distributeMarket(turn, oneTurnInputJSON)即可。
// 调用完毕后会返回额外附加actualMarket值的JSON
// turn 取值为0-4， oneTurnInputJSON格式为：

/*
var oneTurnInputJSON = //这里是测试数据
    {
        'productsList':[
            {
                'owner':0,//id
                'xxx':1.1,
                'ka':2,
                'kb':3,
                'kc':3,
                'priceActual':3500,
                'sellValue':10000,
            },{
                'owner':1,
                'xxx':1.2,
                'ka':3,
                'kb':1,
                'kc':1,
                'priceActual':4500,
                'sellValue':100,
            },{
                'owner':2,
                'xxx':1.3,
                'ka':3,
                'kb':3,
                'kc':3,
                'priceActual':6500,
                'sellValue':100,
            }

        ]
    }
*/

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

var MarketCapacity = [[100,200,300,400,500],//第一年
                    [100,200,300,400,500],
                    [100,200,300,400,500],
                    [100,200,300,400,500],
                    [100,200,300,400,500]];
                        

function preferValue(ka,kb,kc,marketType) {
    // 即为文档中的f
    var thisM = marketMcoef[marketType];
    var thisP = marketPcoef[marketType];
    var tmp = thisM[0]*Math.abs(thisP[0]-ka) +
                thisM[1]*Math.abs(thisP[1]-kb) + 
                thisM[2]*Math.abs(thisP[2]-kc) + 1;
    return 1/tmp;
}

function competitionValue(xxx,ka,kb,kc,priceActual,marketType) {
    // 即为文档中的g
    return xxx*preferValue(ka,kb,kc,marketType)*priceExpect[marketType]/priceActual;
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
    var MarketThisTurn = MarketCapacity[turn];
    /*
    var oneTurnInputJSON = //这里是测试数据
    {
        'productsList':[
            {
                'owner':0,
                'xxx':1.1,
                'ka':2,
                'kb':3,
                'kc':3,
                'priceActual':3500,
                'sellValue':10000,
            },{
                'owner':1,
                'xxx':1.2,
                'ka':3,
                'kb':1,
                'kc':1,
                'priceActual':4500,
                'sellValue':100,
            },{
                'owner':2,
                'xxx':1.3,
                'ka':3,
                'kb':3,
                'kc':3,
                'priceActual':6500,
                'sellValue':100,
            }

        ]
    }*/

    var marketTypeIndex = {
        0:[],
        1:[],
        2:[],
        3:[],
        4:[]
    }

    var oneTurnInput = oneTurnInputJSON['productsList'];

    for(var i=0;i<oneTurnInput.length;i++) {// 对于每一个产品
        var max = 0;
        var actualMarketType = 0;
        var tmpValueF = 0;
        var xxx = oneTurnInput[i].xxx;
        var ka = oneTurnInput[i].ka;
        var kb = oneTurnInput[i].kb;
        var kc = oneTurnInput[i].kc;
        var priceActual = oneTurnInput[i].priceActual;

        for(var j=0;j<5;j++) {//5 是市场类型数目
            tmpValueF = preferValue(ka,kb,kc,j);
            if (tmpValueF>max) {
                max = tmpValueF;
                actualMarketType = j;
            }
        }

        oneTurnInput[i]['f'] = max;
        oneTurnInput[i]['marketType'] = actualMarketType;//实际的细分市场类型
        oneTurnInput[i]['compValue'] = competitionValue(xxx,ka,kb,kc,priceActual,actualMarketType);//在这个细分市场下的竞争力
        marketTypeIndex[actualMarketType].push(i);
    }

    for(var i=0;i<5;i++) {// 5是市场类型数目
        var typeNum = marketTypeIndex[i].length;
        var mThisTurnType = MarketThisTurn[i];
        var sumOfComp = calSumOfCompValue(oneTurnInput,marketTypeIndex[i],typeNum);
        var k0 = 1.3;//为了显示龙头效应的系数
        
        for(var j=0;j<typeNum;j++) {//对于每种手机，都需要一次重新计算市场占比
            var index = marketTypeIndex[i][j];
            var thisComp = oneTurnInput[index]['compValue'];
            var sellValue = oneTurnInput[index]['sellValue'];
            var xxx = oneTurnInput[index]['xxx'];
            var thisActualMarket = xxx*mThisTurnType*Math.pow(thisComp,k0)/Math.pow(sumOfComp,k0);

            if(thisActualMarket > sellValue) { // 如果应该分配的大于产量，则卖出数量即为应该量
                thisActualMarket = sellValue;
            }

            if(mThisTurnType <= thisActualMarket) {//如果剩下的市场不足以支撑应该分配的市场
                thisActualMarket = mThisTurnType;
                oneTurnInput[index]['actualMarket'] = thisActualMarket;
                break;
            }

            oneTurnInput[index]['actualMarket'] = thisActualMarket;
            sumOfComp -= thisComp;
            mThisTurnType -= thisActualMarket;
        }
    }
    return oneTurnInput;
}

module.exports = { distributeMarket }

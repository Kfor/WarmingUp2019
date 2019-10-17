// Author: k
var upStreamUser = require('../models/UpStreamUser')
var middleStreamUser = require('../models/MiddleStreamUser')
var downStreamUser = require('../models/DownStreamUser')
var oneRoundSell = require('../models/OneRoundSell')
var rankList = require('../models/RankList')

var autoFine = -20;
var round = 1;
var upGroupList = ['group1', 'group2', 'group3', 'group4'];
var middleGroupList = ['group5', 'group6', 'group7', 'group8'];
var downGroupList = ['group9', 'group10', 'group11', 'group12'];
var allGroupList = (upGroupList.concat(middleGroupList)).concat(downGroupList);
var dealBetweenList = [];//用来记录组间借贷的array

class TopController {
    async topprofile(ctx) {

    }

    async test(ctx) {
        ctx.body = {
            status: 200,
            basicProgress:
                [{
                    key: '5',
                    time: '2017-10-01 12:00',
                    rate: '发起退货申请',
                    status: 'success',
                    operator: '用户23333wo',
                    cost: '5mins',
                }]
        };
        console.log(ctx.body);
    };
    /** TODO
     * 天使投资
     * @param  data = {
     *          userId:group8,
     *          money:888
     *         }
     */
    async angelInvest(ctx) {
        const data = ctx.request.query;

        ctx.body = {
            status: 200,
            infoText: 'Finished Produce!',
        };
    };

    /**
     * 上中游交易
     * @param data = {
     *            upUserId:group1,
     *            middleUserId:group4,
     *            quality:2,//可选1,2,3，质量
     *            price:1000,
     *            num:10000
     *        } 
     */
    async dealUpMiddle(ctx) {
        const data = ctx.request.query;
        const upTmp = await upStreamUser.findUserByUserId(data.upUserId);
        const up = upTmp.dataValues;
        const middleTmp = await middleStreamUser.findUserByUserId(data.middleUserId);
        const middle = middleTmp.dataValues;
        const type = 'chip' + data.quality + 'Num'

        if (up[type] < data.num) {
            //alert('库存不足!');
            console.log('库存不足');
            upStreamUser.addCurrency(data.upUserId, autoFine);
            middleStreamUser.addCurrency(data.middleUserId, autoFine);
        }
        else if (middle.currency < Number((data.price) * (data.num))) {
            //alert('余额不足!');
            console.log('余额不足');
            upStreamUser.addCurrency(data.upUserId, autoFine);
            middleStreamUser.addCurrency(data.middleUserId, autoFine);
        }
        else {
            if (data.quality == 1) {
                var new1 = up[type] - Number(data.num);
            }
            if (data.quality == 2) {
                var new2 = up[type] - Number(data.num);
            }
            if (data.quality == 3) {
                var new3 = up[type] - Number(data.num);
            }
            upStreamUser.update(data.upUserId, {
                chip1Num: new1,
                chip2Num: new2,
                chip3Num: new3,
                thisProfit: up.thisProfit + Number((data.price) * (data.num)),
                currency: up.currency + Number((data.price) * (data.num)),
            });

            if (data.quality == 1) {
                var new1 = middle[type] + Number(data.num);
            }
            if (data.quality == 2) {
                var new2 = middle[type] + Number(data.num);
            }
            if (data.quality == 3) {
                var new3 = middle[type] + Number(data.num);
            }
            middleStreamUser.update(data.middleUserId, {
                chip1Num: new1,
                chip2Num: new2,
                chip3Num: new3,
                thisProfit: middle.thisProfit - Number((data.price) * (data.num)),
                currency: middle.currency - (data.price) * (data.num),
            })
        }

        ctx.body = {
            status: 200,
            infoText: 'Finished Deal!',
        };
    };

    /**
     * 中下游交易
     * @param data = {
     *            middleUserId:group4,
     *            downUserId:group8,
     *            ka:2,
     *            kb:2,
     *            kc:2,
     *            num:2000,
     *            price:5000
     *        }
     */
    async dealMiddleDown(ctx) {
        const data = ctx.request.query;
        const middleTmp = await middleStreamUser.findUserByUserId(data.middleUserId);
        const middle = middleTmp.dataValues;
        const downTmp = await downStreamUser.findUserByUserId(data.downUserId);
        const down = downTmp.dataValues;
        var index = -1;
        for (var i = 0; i < middle.phoneNum.length; i++) { //找到对应型号手机的编号
            console.log(middle.phoneNum[i])
            if (middle.phoneNum[i].ka == data.ka &&
                middle.phoneNum[i].kb == data.kb &&
                middle.phoneNum[i].kc == data.kc) {
                index = i;
                break;
            }
        }

        if (index == -1) {
            //alert('无此型号的手机!');
            console.log('无此型号的手机');
            downStreamUser.addCurrency(data.downUserId, autoFine);
            middleStreamUser.addCurrency(data.middleUserId, autoFine);
        }
        else if (middle.phoneNum[index].amount < data.num) {
            //alert('库存不足!');
            console.log('库存不足');
            downStreamUser.addCurrency(data.downUserId, autoFine);
            middleStreamUser.addCurrency(data.middleUserId, autoFine);
        }
        else if (down.currency < Number((data.price) * (data.num))) {
            //alert('余额不足!');
            console.log('余额不足');
            downStreamUser.addCurrency(data.downUserId, autoFine);
            middleStreamUser.addCurrency(data.middleUserId, autoFine);
        }
        else {
            var newMiddlePhone = middle.phoneNum;
            newMiddlePhone[index].amount -= Number(data.num);
            var newDownPhone = down.phoneNum;
            var downHasThisPhone = false;
            for (var i = 0; i < newDownPhone.length; i++) {
                if (newDownPhone[i].ka == data.ka &&
                    newDownPhone[i].kb == data.kb &&
                    newDownPhone[i].kc == data.kc) {
                    downHasThisPhone = true;
                    newDownPhone[i].amount += Number(data.num);
                }
            }
            if (!downHasThisPhone) {
                newDownPhone.push({ ka: data.ka, kb: data.kb, kc: data.kc, amount: data.num });
            }

            middleStreamUser.update(data.middleUserId, {
                phoneNum: newMiddlePhone,
                thisProfit: middle.thisProfit + Number((data.price) * (data.num)),
                currency: middle.currency + Number((data.price) * (data.num)),
            });
            downStreamUser.update(data.downUserId, {
                phoneNum: newDownPhone,
                thisProfit: down.thisProfit - Number((data.price) * (data.num)),
                currency: down.currency - Number((data.price) * (data.num)),
            });
        }

        ctx.body = {
            status: 200,
            infoText: 'Finished Deal!',
        };
    };

    /**
     * 下游到市场
     * @param data = {
     *            round:1,
     *        } 
     */
    async dealDown(ctx) {
        const data = ctx.request.query;

        // 先从oneroundsell拿到数据
        // 然后根据结果算出分配结果
        // 根据分配结果返回维护用户表

        const oneTurnInputRaw = await oneRoundSell.getAllSell(round);
        // console.log(oneTurnInputRaw[0].dataValues);
        var oneTurnInput = [];
        for (var i = 0; i < oneTurnInputRaw.length; i++) {
            var one = oneTurnInputRaw[i].dataValues;

            var t = await downStreamUser.findUserByUserId(one.userId);
            // console.log(t.dataValues);
            var tmpAd = t.dataValues.ad;
            one.ad = tmpAd;
            oneTurnInput.push(one);
        }
        // console.log(oneTurnInput);
        var result = oneRoundSell.distributeMarket(round, oneTurnInput);
        console.log(result);

        for (var i = 0; i < result.length; i++) {
            var tmpUserId = result[i].userId;
            var tmp = await downStreamUser.findUserByUserId(tmpUserId);
            var newPhone = tmp.dataValues.phoneNum;

            for (var j = 0; j < newPhone.length; j++) {
                if (newPhone[j].ka == result[i].ka &&
                    newPhone[j].kb == result[i].kb &&
                    newPhone[j].kc == result[i].kc) {
                    newPhone[j].amount -= Math.ceil(Number(result[i].actualMarket));
                }
            }

            downStreamUser.update(tmpUserId, {
                currency: tmp.dataValues.currency + Number(result[i].actualMarket * result[i].price),
                thisProfit: tmp.dataValues.thisProfit + Number(result[i].actualMarket * result[i].price),
                phoneNum: newPhone,
            })
        }


        ctx.body = {
            status: 200,
            infoText: 'Finished Deal!',
        };
    };

    /** TODO
     * 
     * @param data = {
     *            userId1: group1,
     *            userId2: group2,
     *            money: 2000,
     *            returnMoney: 3000,
     *            turnsAfter: 2,// 两轮之后返还
     * } 
     */
    async dealBetween(ctx) {
        const data = ctx.request.query;
        var valid = true;

        dealBetweenList.push({
            userId1: data.userId1,
            userId2: data.userId2,
            money: data.money,
            returnMoney: data.returnMoney,
            startTurn: Number(round),
            endTurn: Number(round) + Number(data.turnsAfter)
        });
        console.log(dealBetweenList);

        var userId1 = data.userId1;
        var userId2 = data.userId2;
        
        for(let one of upGroupList){
            if (userId1 == one) {
                upStreamUser.addCurrency(userId1, -1*Number(data.money));
            }
        }
        for(let one of middleGroupList){
            if (userId1 == one) {
                middleStreamUser.addCurrency(userId1, -1*Number(data.money));
            }
        }
        for(let one of downGroupList) {
            if (userId1 == one) {
                downStreamUser.addCurrency(userId1, -1*Number(data.money));
            }
        }

        
        for(let one of upGroupList){
            if (userId2 == one) {
                upStreamUser.addCurrency(userId2, Number(data.money));
            }
        }
        for(let one of middleGroupList){
            if (userId2 == one) {
                middleStreamUser.addCurrency(userId2, Number(data.money));
            }
        }
        for(let one of downGroupList) {
            if (userId2 == one) {
                downStreamUser.addCurrency(userId2, Number(data.money));
            }
        }


        ctx.body = {
            status: 200,
            infoText: 'Finished DealBetween!',
        };
    };



    /**
     * 结束按钮
     * @param data = {}
     */
    async oneRound(ctx) {


        //以下用于更新round和各自的loan, currency, profit
        upStreamUser.endRound();
        middleStreamUser.endRound();
        downStreamUser.endRound();


        //以下用于排序
        var tmpRankList = [];
        for (let i in allGroupList) {
            var tmpInfo = {};
            for(let one of upGroupList) {
                if (allGroupList[i] == one) {
                    var oneGroup = await upStreamUser.findUserByUserId(allGroupList[i]);
                    tmpInfo.userId = oneGroup.dataValues.userId;
                    tmpInfo.currency = oneGroup.dataValues.currency;
                    tmpInfo.loan = oneGroup.dataValues.loan;
                    tmpInfo.totalStorageCost = oneGroup.dataValues.totalStorageCost;
                }
            }
            for(let one of middleGroupList) {
                if (allGroupList[i] == one) {
                    var oneGroup = await middleStreamUser.findUserByUserId(allGroupList[i]);
                    tmpInfo.userId = oneGroup.dataValues.userId;
                    tmpInfo.currency = oneGroup.dataValues.currency;
                    tmpInfo.loan = oneGroup.dataValues.loan;
                    tmpInfo.totalStorageCost = oneGroup.dataValues.totalStorageCost;
                    console.log(oneGroup)
                }
            }
            for(let one of downGroupList) {
                if (allGroupList[i] == one) {
                    var oneGroup = await downStreamUser.findUserByUserId(allGroupList[i]);
                    tmpInfo.userId = oneGroup.dataValues.userId;
                    tmpInfo.currency = oneGroup.dataValues.currency;
                    tmpInfo.loan = oneGroup.dataValues.loan;
                    tmpInfo.totalStorageCost = oneGroup.dataValues.totalStorageCost;
                }
            }
            tmpRankList.push(tmpInfo);
        }
        function sortBy(a, b) {
            return b.currency - a.currency;
        }
        tmpRankList.sort(sortBy);
        for (let i in tmpRankList) {
            tmpRankList[i].rank = Number(i)+1 ;
            tmpRankList[i].loanMax = (13 - (Number(i) + 1)) / 12 * Number(1000000);
        }            
        rankList.update(tmpRankList);

        console.log('rankList',tmpRankList)


        // 以下处理loanMax，rank问题
        upStreamUser.updateLoanMax(tmpRankList);
        middleStreamUser.updateLoanMax(tmpRankList);
        downStreamUser.updateLoanMax(tmpRankList);


        // 处理组间借贷问题
        console.log('betweenlist',dealBetweenList)
        for (let i in dealBetweenList) {
            if (dealBetweenList[i].endTurn == round) {//第round结束时
                //this.add(dealBetweenList[i].userId1, Number(dealBetweenList[i].returnMoney));
                //this.add(dealBetweenList[i].userId2, -Number(dealBetweenList[i].returnMoney));
                
                var userId1 = dealBetweenList[i].userId1;
                var userId2 = dealBetweenList[i].userId2;
                var money = dealBetweenList[i].returnMoney;
                dealBetweenList[i]={};
                for(let one of upGroupList){
                    if (userId1 == one) {
                        upStreamUser.addCurrency(userId1, Number(money));
                        console.log(money)
                    }
                }
                for(let one of middleGroupList){
                    if (userId1 == one) {
                        middleStreamUser.addCurrency(userId1, Number(money));
                    }
                }
                for(let one of downGroupList) {
                    if (userId1 == one) {
                        downStreamUser.addCurrency(userId1, Number(money));
                    }
                }

                
                for(let one of upGroupList){
                    if (userId2 == one) {
                        upStreamUser.addCurrency(userId2, -1*Number(money));
                    }
                }
                for(let one of middleGroupList){
                    if (userId2 == one) {
                        middleStreamUser.addCurrency(userId2, -1*Number(money));
                    }
                }
                for(let one of downGroupList) {
                    if (userId2 == one) {
                        downStreamUser.addCurrency(userId2, -1*Number(money));
                    }
                }
            }
        }

        round += 1;
        console.log('to next round: ' + round);

        ctx.body = {
            status: 200,
            infoText: 'Finished OneRound!',
        };
    };

    /**
     * 罚款
     * @param data = {
     *            userId: group8
     *            fine: 666
     *        }
     */
    async fine(ctx) { //这里用addCurrency增加负值来作为罚款
        const data = ctx.request.query;
        const result = data.userId;

        for(let one of upGroupList){
            if (result == one) {
                upStreamUser.addCurrency(result, (-1)*Number(data.fine));
            }
        }
        for(let one of middleGroupList){
            if (result == one) {
                middleStreamUser.addCurrency(result, (-1)*Number(data.fine));
            }
        }
        for(let one of downGroupList) {
            if (result == one) {
                downStreamUser.addCurrency(result, (-1)*Number(data.fine));
            }
        }

        ctx.body = {
            status: 200,
            infoText: 'Finished Fine!',
        };
    };

    /**
     * 添加
     * @param data = {
     *            userId: group8,
     *            money: 888
     *        } 
     */
    async add(ctx) {
        const data = ctx.request.query;
        const result = data.userId;
 
        for(let one of upGroupList){
            if (result == one) {
                upStreamUser.addCurrency(result, Number(data.money));
            }
        }
        for(let one of middleGroupList){
            if (result == one) {
                middleStreamUser.addCurrency(result, Number(data.money));
            }
        }
        for(let one of downGroupList) {
            if (result == one) {
                downStreamUser.addCurrency(result, Number(data.money));
            }
        }

        ctx.body = {
            status: 200,
            infoText: 'Finished Add!',
        };
    };


    async reset(ctx) {
        round = 1;
        console.log('Reset to round ' + round);

        var upStreamUser = require('../models/UpStreamUser');
        upStreamUser.sync();
        upStreamUser.destroy();
        upStreamUser.addUser('group1')
        upStreamUser.addUser('group2')
        upStreamUser.addUser('group3')
        upStreamUser.addUser('group4')


        var middleStreamUser = require('../models/MiddleStreamUser');
        middleStreamUser.sync();
        middleStreamUser.destroy();
        middleStreamUser.addUser('group5')
        middleStreamUser.addUser('group6')
        middleStreamUser.addUser('group7')
        middleStreamUser.addUser('group8')

        var downStreamUser = require('../models/DownStreamUser');
        downStreamUser.sync();
        downStreamUser.destroy();
        downStreamUser.addUser('group9')
        downStreamUser.addUser('group10')
        downStreamUser.addUser('group11')
        downStreamUser.addUser('group12')

        var oneRoundSell = require('../models/OneRoundSell');
        oneRoundSell.sync();
        oneRoundSell.destroy();
        oneRoundSell.addOneRoundSell('test', { userId: 'test', ka: 0, kb: 0, kc: 0, amount: 0, price: 0, round: 1 });

        var rankList = require('../models/RankList');
        rankList.sync();
        rankList.destroy();
        for(let i=0;i<12;i++) {
            var thisGroup = 'group'+Number(i+1);
            rankList.addRankItem(thisGroup);
        }

        ctx.body = {
            status: 200,
            infoText: 'RESET DONE!',
        };
    }

}

module.exports = new TopController();

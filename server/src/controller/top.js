// Author: k
var upStreamUser = require('../models/UpStreamUser')
var middleStreamUser = require('../models/MiddleStreamUser')
var downStreamUser = require('../models/DownStreamUser')

var autoFine = -10;
class TopController {
    


    async test(ctx) {
        ctx.body = {
            key :'hhh',

        }
    }
    /**
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
        const type = 'chip'+data.quality+'Num'

        if(up[type]<data.num) {
            alert('库存不足!');
            console.log('库存不足');
            upTmp.addCurrency(data.upUserId,autoFine);
            middleTmp.addCurrency(data.middleUserId,autoFine);
        }
        else if(middle.currency<Number((data.price)*(data.num))) {
            alert('余额不足!');
            console.log('余额不足');
            upTmp.addCurrency(data.upUserId,autoFine);
            middleTmp.addCurrency(data.middleUserId,autoFine);
        }
        else {
            
            upStreamUser.update({
                type: up[type] - data.num,
                currency: up.currency + (data.price)*(data.num),
            }, {
                where: {userId:data.upUserId}
            });
            middleStreamUser.update({
                type: middle[type] + data.num,
                currency: middle.currency - (data.price)*(data.num),
            }, {
                where: {userId:data.middleUserId}
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
        for(var i=0;i<middle.phoneNum;i++) { //找到对应型号手机的编号
            if(middle.phoneNum[i].ka==data.ka&&
                middle.phoneNum[i].kb==data.kb&&
                middle.phoneNum[i].kc==data.kc) {
                    index = i;
                    break;
                }
        }

        if(index==-1) {
            alert('无此型号的手机!');
            console.log('无此型号的手机');
            downTmp.addCurrency(data.downUserId,autoFine);
            middleTmp.addCurrency(data.middleUserId,autoFine);
        }
        else if(middle.phoneNum[index].amount<data.num) {
            alert('库存不足!');
            console.log('库存不足');
            downTmp.addCurrency(data.downUserId,autoFine);
            middleTmp.addCurrency(data.middleUserId,autoFine);
        }
        else if(down.currency<Number((data.price)*(data.num))) {
            alert('余额不足!');
            console.log('余额不足');
            downTmp.addCurrency(data.downUserId,autoFine);
            middleTmp.addCurrency(data.middleUserId,autoFine);
        }
        else {
            var newMiddlePhone = middle.phoneNum;
            newMiddlePhone[index].amount -= data.num;
            var newDownPhone = down.phoneNum;
            var downHasThisPhone = false;
            for(var i=0;i<newDownPhone.length;i++) {
                if(newDownPhone[i].ka==data.ka&&
                    newDownPhone[i].kb==data.kb&&
                    newDownPhone[i].kc==data.kc) {
                        downHasThisPhone = true;
                        newDownPhone[i].amount += data.num;
                    }
            }
            if(! downHasThisPhone) {
                newDownPhone.push({ka:data.ka,kb:data.kb,kc:data.kc,amount:data.num});
            }

            middleStreamUser.update({
                phoneNum: newMiddlePhone,
                currency: up.currency + (data.price)*(data.num),
            }, {
                where: {userId:data.middleUserId}
            });
            downStreamUser.update({
                phoneNum: newDownPhone,
                currency: middle.currency - (data.price)*(data.num),
            }, {
                where: {userId:data.downUserId}
            })
        }

        ctx.body = {
            status: 200,
            infoText: 'Finished Deal!',
        };
      };

      /**
       * 下游到市场
       * @param data = {
       *            //不需要
       *        } 
       */
      async dealDown(ctx) {
        const data = ctx.request.query;
    
        ctx.body = {
            status: 200,
            infoText: 'Finished Deal!',
        };
      };

      /**
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
        const data = ctx.request.query;
    
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

        if(result in ['group1','group2','group3']) {
            upStreamUser.addCurrency(result,(-1)*data.fine)
        }
        else if(result in ['group4','group5','group6','group7']) {
            middleStreamUser.addCurrency(result,(-1)*data.fine)
        }
        else {
            downStreamUser.addCurrency(result,(-1)*data.fine)
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
        const result = data.dataValues.userId;

        if(result in ['group1','group2','group3']) {
            upStreamUser.addCurrency(result,data.money)
        }
        else if(result in ['group4','group5','group6','group7']) {
            middleStreamUser.addCurrency(result,data.money)
        }
        else {
            downStreamUser.addCurrency(result,data.money)
        }

        ctx.body = {
            status: 200,
            infoText: 'Finished Add!',
        };
      };

}

module.exports = new TopController();

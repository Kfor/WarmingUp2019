const upStreamUserController = require('./controller/upStreamUser');
const downStreamUserController = require('./controller/downStreamUser');
const middleStreamUserController = require('./controller/middleStreamUser');
const topController = require('./controller/top')


module.exports = (router) => {
  router.prefix('/api');
  router
    
    .post('/upstream/invest', upStreamUserController.invest)//userId,TInvest,MInvest,
    .post('/upstream/produce', upStreamUserController.produce)//userId,chip1Num,chip2Num,chip3Num
    .post('/upstream/loan', upStreamUserController.loan)//userId,loan
    .post('/upstream/repay', upStreamUserController.repay)//userId,repay

    .post('/middlestream/invest', middleStreamUserController.invest)//userId,DInvest,KInvest
    .post('/middlestream/produce', middleStreamUserController.produce)//userId,ka,kb,kc,amount
    .post('/middlestream/loan', middleStreamUserController.loan)//userId,loan
    .post('/middlestream/repay', middleStreamUserController.repay)//userId,repay

    .post('/downstream/advertise', downStreamUserController.advertise)//userId,adInvest
    .post('/downstream/sell', downStreamUserController.sell)//userId,ka,kb,kc,price,amount
    .post('/downstream/loan', downStreamUserController.loan)//userId,loan
    .post('/downstream/repay', downStreamUserController.repay)//userId,repay

    .post('/top/angelInvest', topController.angelInvest)//userId,money
    .post('/top/dealUpMiddle', topController.dealUpMiddle)//upUserId,middleUserId,quality,price,num
    .post('/top/dealMiddleDown', topController.dealMiddleDown)//middleUserId,downUserId,ka,kb,kc,price,num
    .post('/top/dealDown', topController.dealDown)//不需要参数，每一轮在所有的下游提交售卖结束后按下即可
    .post('/top/dealBetween', topController.dealBetween)//userId1,userId2,turnsAfter,money
    .post('/top/oneRound', topController.oneRound)//不需要参数，在每一轮结束后按下
    .post('/top/fine', topController.fine)//userId,fine
    .post('/top/add', topController.add)//userId,money
    .post('/top/reset', topController.reset)//不需要参数，用于重置数据库
    .get('/top/test', topController.test)//test

    
    //for test
    .post('/upstream/clear', upStreamUserController.clear)
    .post('/upstream/add', upStreamUserController.addCurrency)
    .post('/middlestream/clear', middleStreamUserController.clear)
    .post('/middlestream/add',middleStreamUserController.addCurrency)
    .post('/downstream/clear', downStreamUserController.clear)
    .post('/downstream/add',downStreamUserController.addCurrency)
    .post('/downstream/init', downStreamUserController.init)


    ;
};

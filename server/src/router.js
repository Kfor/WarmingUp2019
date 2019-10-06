const upStreamUserController = require('./controller/upStreamUser');
const downStreamUserController = require('./controller/downStreamUser');
const middleStreamUserController = require('./controller/middleStreamUser');
const topController = require('./controller/top')


module.exports = (router) => {
  router.prefix('/api');
  router
    
    .post('/upstream/invest', upStreamUserController.invest)
    .post('/upstream/produce', upStreamUserController.produce)
    .post('/upstream/clear', upStreamUserController.clear)
    .post('/upstream/loan', upStreamUserController.loan)
    .post('/upstream/repay', upStreamUserController.repay)
    .post('/upstream/add', upStreamUserController.addCurrency)

    .post('/middlestream/invest', middleStreamUserController.invest)
    .post('/middlestream/produce', middleStreamUserController.produce)
    .post('/middlestream/clear', middleStreamUserController.clear)
    .post('/middlestream/loan', middleStreamUserController.loan)
    .post('/middlestream/repay', middleStreamUserController.repay)
    .post('/middlestream/add',middleStreamUserController.addCurrency)

    .post('/downstream/advertise', downStreamUserController.advertise)
    .post('/downstream/sell', downStreamUserController.sell)
    .post('/downstream/clear', downStreamUserController.clear)
    .post('/downstream/loan', downStreamUserController.loan)
    .post('/downstream/repay', downStreamUserController.repay)
    .post('/downstream/init', downStreamUserController.init)
    .post('/downstream/add',downStreamUserController.addCurrency)

    .get('/top/test', topController.test)
    .post('/top/angelInvest', topController.angelInvest)
    .post('/top/dealUpMiddle', topController.dealUpMiddle)
    .post('/top/dealMiddleDown', topController.dealMiddleDown)
    .post('/top/dealDown', topController.dealDown)
    .post('/top/dealBetween', topController.dealBetween)
    .post('/top/oneRound', topController.oneRound)
    .post('/top/fine', topController.fine)
    .post('/top/add', topController.add)
    .post('/top/reset', topController.reset)

    ;
};

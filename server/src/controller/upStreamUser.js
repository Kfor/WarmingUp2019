var User = require('../models/UpStreamUser')
var Round = require('../models/Round')

class UserController {
  async upprofile(ctx) {
    const data = ctx.request.query;
    const result = await User.findUserByUserId(data.userId);
    var round = await Round.getRound();

    console.log(result.dataValues)
    ctx.body = {
      userInfo: result.dataValues,
      round: round.dataValues.round
    };
  }

  async produce(ctx) {
    const data = ctx.request.query;
    var validFlag = await User.produce(data.userId, data);

    if (validFlag == 1) {//余额不足
      ctx.status = 600;
      User.autoFine(data.userId);
      return;
    }
    if (validFlag == 2) {//产能不足
      ctx.status = 605;
      User.autoFine(data.userId);
      return;
    }
    else {
      ctx.body = {
        status: 200,
        infoText: 'Finished Produce!',
      };
    }
  };

  async invest(ctx) {
    const data = ctx.request.query;
    var valid = await User.invest(data.userId, data);
    if(!valid) {
      ctx.status = 600;
      User.autoFine(data.userId);
      return;
    }
    else{
      ctx.body = {
        status: 200,
        infoText: 'Finished Invest!',
      };
    }
  };

  async clear(ctx) {
    const data = ctx.request.query;
    User.clear(data.userId);

    ctx.body = {
      status: 200,
      infoText: 'Finished Clear!',
    };
  };


  async loan(ctx) {
    const data = ctx.request.query;
    var valid = await User.loan(data.userId, data);

    if (!valid) {
      ctx.status = 603;
      User.autoFine(data.userId);
    }
    else {
      ctx.body = {
        status: 200,
        infoText: 'Finished loan!',
      };
    }
  };


  async repay(ctx) {
    const data = ctx.request.query;
    var valid = await User.repay(data.userId, data);

    if (!valid) {
      ctx.status = 600;
      User.autoFine(data.userId); return;
    }
    else {
      ctx.body = {
        status: 200,
        infoText: 'Finished repay!',
      };
    }
  };

  async addCurrency(ctx) {
    const data = ctx.request.query;
    User.addCurrency(data.userId, data.money);

    ctx.body = {
      status: 200,
      infoText: 'Finished add!',
    };
  };
}

module.exports = new UserController();

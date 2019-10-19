// Author: k

var User = require('../models/DownStreamUser')
var OneRoundSell = require('../models/OneRoundSell')
var Round = require('../models/Round')

class UserController {
  async downprofile(ctx) {
    const data = ctx.request.query;
    const result = await User.findUserByUserId(data.userId);
    var round = await Round.getRound();
    console.log(result.dataValues)
    ctx.body = {
      userInfo:result.dataValues,
      round:round.dataValues.round,
    };
  }

  async advertise(ctx) {
      const data = ctx.request.query;
      User.advertise(data.userId, data);
      ctx.body = {
        status: 200,
        infoText: 'Finished Advertise!'
      };
  }

  async sell(ctx) {
    var roundtable = await Round.getRound();
    var round = roundtable.dataValues.round;
    var data = ctx.request.query;
    User.sell(data.userId, data);
    data.round = round;
    console.log(data)
    OneRoundSell.addOneRoundSell(data.userId, data);
    
    ctx.body = {
      status: 200,
      infoText: 'Finished Sell!'
    };
  } 

  async clear(ctx) {
    const data = ctx.request.query;
    User.clear(data.userId);

    ctx.body = {
      status: 200,
      infoText: 'Finished Clear!',
    };
  };

  async init(ctx) {
    const data = ctx.request.query;
    User.init(data.userId);

    ctx.body = {
      status: 200,
      infoText: 'Finished Init!',
    };
  };
  
  async loan(ctx) {
    const data = ctx.request.query;
    User.loan(data.userId, data);

    ctx.body = {
      status: 200,
      infoText: 'Finished loan!',
    };
  };
  
  async repay(ctx) {
    const data = ctx.request.query;
    User.repay(data.userId, data);

    ctx.body = {
      status: 200,
      infoText: 'Finished repay!',
    };
  };

  async addCurrency(ctx) {
    const data = ctx.request.query;
    User.addCurrency(data.userId,data.money);

    ctx.body = {
      status: 200,
      infoText: 'Finished add!',
    };
  };
}

module.exports = new UserController();

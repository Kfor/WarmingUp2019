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
      var valid = await User.advertise(data.userId, data);
      if (!valid) {
        ctx.status = 600;
        User.autoFine(data.userId);
        return;
      }
      else{
        ctx.body = {
          status: 200,
          infoText: 'Finished Advertise!'
        };
      }
  }

  async sell(ctx) {
    var roundtable = await Round.getRound();
    var round = roundtable.dataValues.round;
    var data = ctx.request.query;
    var valid = await User.sell(data.userId, data);

    data.round = round;
    if(valid == 0) {
      ctx.status = 602;
      User.autoFine(data.userId);
      return;
    }
    if(valid == 1){
      OneRoundSell.addOneRoundSell(data.userId, data);
      
      ctx.body = {
        status: 200,
        infoText: 'Finished Sell!'
      };
    }
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
    var valid = await User.loan(data.userId, data);

    if(!valid) {
      ctx.status = 603;
      User.autoFine(data.userId);
    }
    else{
      ctx.body = {
        status: 200,
        infoText: 'Finished loan!',
      };
    }
  };
  
  async repay(ctx) {
    const data = ctx.request.query;
    var valid = await User.repay(data.userId, data);

    if(!valid){
      ctx.status = 600;
      User.autoFine(data.userId);
      return;
    }
    else{
      ctx.body = {
        status: 200,
        infoText: 'Finished repay!',
      };
    }
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

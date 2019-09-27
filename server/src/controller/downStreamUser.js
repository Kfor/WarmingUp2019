// Author: k

var User = require('../models/DownStreamUser')
var OneRoundSell = require('../models/OneRoundSell')

class UserController {
  
  async advertise(ctx) {
      const data = ctx.request.query;
      User.advertise(data.userId, data);
      ctx.body = {
        status: 200,
        infoText: 'Finished Advertise!'
      };
  }

  async sell(ctx) {
    const data = ctx.request.query;
    User.sell(data.userId, data);

    OneRoundSell.addOneRoundSell(data.userId, data);
    
    ctx.body = {
      status: 200,
      infoText: 'Finished Sell!'+ flag
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
  
  async debt(ctx) {
    const data = ctx.request.query;
    User.debt(data.userId, data);

    ctx.body = {
      status: 200,
      infoText: 'Finished debt!',
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

var User = require('../models/UpStreamUser')

class UserController {

  async produce(ctx) {
    const data = ctx.request.query;
    User.produce(data.userId, data);

    ctx.body = {
        status: 200,
        infoText: 'Finished Produce!',
    };
  };

  async invest(ctx) {
    const data = ctx.request.query;
    User.invest(data.userId, data);

    ctx.body = {
        status: 200,
        infoText: 'Finished Invest!',
    };
  };

  async clear(ctx) {
    const data = ctx.request.query;
    User.clear(data.userId);

    ctx.body = {
      status: 200,
      infoText: 'Finished Clear!',
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

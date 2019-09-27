// Author: k

var User = require('../models/DownStreamUser')

class DownStreamUserController {
  async login(ctx) {
    const data = ctx.request.body;
    const result = await User.findUserById(data.id);
    if (result == null) {
      console.log(`[INFO]: ${data.id}用户不存在`)
      ctx.body = {
        status: 200,
        statusText: 'err',
        infoText: '该用户不存在'
      };
    }
    else {
      if (data.password == result.dataValues.password){
        console.log(`[INFO]: ${data.id}用户登录`)
        ctx.body = {
          status: 200,
          statusText: 'ok',
          infoText: '登录成功'
        }
      }
      else {
        console.log(`[INFO]: ${data.id}用户登录失败, 密码错误`)
        ctx.body = {
          status: 200,
          statusText: 'err',
          infoText: '密码错误'
        }
      }
    }
  }

  async register(ctx) {
    const data = ctx.request.body;
    const result = await User.findUserById(data.id);
    if (result == null) {
      console.log(`[INFO]: ${data.id} 用户不存在, 进行创建`);
      User.addUser(data.id, data.password);
      ctx.body = {
        status: 200,
        statusText: 'ok',
        infoText: '注册成功'
      };
    }
    else{
      console.log(`[INFO]: ${data.id} 用户已存在, 返回错误消息`);
      ctx.body = {
        status: 200,
        statusText: 'err',
        infoText: '此邮箱已注册'
      };
    }
  }
  
  async logout(ctx) {
    ctx.body = {
      status: 200,
      statusText: 'ok',
      currentAuthority: 'guest',
    };
  }




  async processOneTurnSell(ctx) {
      const data = ctx.request.body;
//      const result = await 
// TODO : 这里似乎需要重新建表？因为要把一轮输入完毕后，每个玩家的输入都汇总到一个json中
  }
}

module.exports = new DownStreamUserController();

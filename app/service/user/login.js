const _ = require('lodash');
const { hash, decryptRsa, signJwt } = require('../../../utils/encryption');

/**
 * 发送证书: 添加 token 至响应头
 * @param {Object} user             当前用户
 * @param {Object} ctx              koa 上下文
 */
const sendCertificate = ({ user, ctx }) => {
  const token = signJwt({
    id: user.id,
    name: user.name,
    role: user.role,
    account: user.account,
  });
  ctx.set('Authorization', token);
};

/**
 * 用户登录入口
 * @param {String} account    账号
 * @param {String} password   密码
 * @param {Object} ctx        koa 上下文
 */
module.exports = async ({ account, password, ctx }) => {
  const userServer = ctx.db.mongo.User;
  const roleServer = ctx.db.mongo.Role;

  const data = {
    user: null,
    message: '登录成功!',
  };

  // 1. 账号密码登录
  if (!!account && !!password){
    const decryptPassword = hash({ data: decryptRsa(password) });
    data.user = await userServer.findOne({ password: decryptPassword, account});
    !data.user && (data.message = '账号或者密码错误');
  }

  // 2. 更新 data
  if (!data.user){
    // 2.1. 账号密码登录失败: 从 koa.state 中获取数据(在中间件 jurisdiction 中设置的)
    data.user = ctx.state.user;
  } else {
    // 2.2 账号密码登录成功: 更新 koa state
    data.user.role && (ctx.state.role = await roleServer.findOne({ _id: data.user.role }));
    ctx.state.user = data.user;
  }

  // 3. 发送证书
  sendCertificate({ user: data.user, ctx });
  return data;
};

/**
 * @description 登入驗證中間件
 */

const { ErrorModel } = require('../res-model/index');

module.exports = async (ctx, next) => {
  const session = ctx.session;
  if (session && session.userInfo) {
    await next();
    return;
  }
  
  ctx.body = new ErrorModel(10003, '登入驗證失敗');
};

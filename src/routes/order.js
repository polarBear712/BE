/**
 * @description order router
 */

const router = require('koa-router')();
const { SuccessModel, ErrorModel } = require('../res-model/index');
const loginCheck = require('../middleware/loginCheck');
const { createOrder, getOrderList } = require('../controller/order');

router.prefix('/api/order');

// 創建訂單
router.post('/', loginCheck, async (ctx, next) => {
  // 當前用戶名
  const userInfo = ctx.session.userInfo;
  const username = userInfo.username;

  // 獲取訂單數據
  const data = ctx.request.body;

  // 創建訂單
  try {
    const newOrder = await createOrder(username, data);
    ctx.body = new SuccessModel(newOrder);
  } catch (error) {
    console.error('訂單創建失敗', error);
    ctx.bdoy = new ErrorModel(10008, '訂單創建失敗');
  }
});

// 獲取訂單列表
router.get('/', loginCheck, async (ctx, next) => {
  // 有登入驗證, 可以直接獲取 session
  const userInfo = ctx.session.userInfo;
  const username = userInfo.username;

  const list = await getOrderList(username);

  ctx.body = new SuccessModel(list);
});

module.exports = router;

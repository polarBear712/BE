const router = require('koa-router')();
const { register, login } = require('../controller/user');
const loginCheck = require('../middleware/loginCheck');
const { SuccessModel, ErrorModel } = require('../res-model/index');

router.prefix('/api/user');

// 註冊
router.post('/register', async function (ctx, next) {
  const { username, password } = ctx.request.body;
  try {
    const newData = await register(username, password);
    // ctx.body = {
    //   code: 0,
    //   data: newData // 多返回一個信息, 防止前端有需求變更, 再來找後端修改代碼
    // };
    ctx.body = new SuccessModel(newData);
  } catch (error) {
    console.error('註冊失敗', error);
    // ctx.body = {
    //   code: 10001,
    //   message: `註冊失敗 - ${error.message}`
    // };
    ctx.body = new ErrorModel(10001, `註冊失敗 - ${error.message}`);
  }
});

// 登入
router.post('/login', async function (ctx, next) {
  const { username, password } = ctx.request.body;
  // 查詢單個用戶
  try {
    const res = await login(username, password);
    if (res) {
      // 登入成功
      ctx.session.userInfo = { username, _id: res._id }; // 設置session
      ctx.body = new SuccessModel();
    } else {
      // 登入失敗
      ctx.body = new ErrorModel(10002, `登入驗證失敗`);
    }
  } catch (error) {
    console.error('登入驗證失敗', error);
    ctx.body = new ErrorModel(10002, `登入驗證失敗 - ${error.message}`);
  }
});

// 獲取用戶信息
router.get('/info', loginCheck, async function (ctx, next) {
  const session = ctx.session;
  ctx.body = new SuccessModel(session.userInfo);
});

module.exports = router;

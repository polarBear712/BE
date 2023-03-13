/**
 * @description address router
 */

const router = require('koa-router')();
const { SuccessModel, ErrorModel } = require('../res-model/index');
const loginCheck = require('../middleware/loginCheck');
const { createAddress, getAddressList, getAddressById, updateAddress } = require('../controller/address');

router.prefix('/api/user/address');

// 創建收貨地址
router.post('/', loginCheck, async (ctx, next) => {
  const userInfo = ctx.session.userInfo;
  const username = userInfo.username;
  const data = ctx.request.body;
  console.log(data, 'data');
  try {
    const newAddress = await createAddress(username, data);
    ctx.body = new SuccessModel(newAddress);
  } catch (error) {
    console.error('創建收貨地址失敗', error);
    ctx.bdoy = new ErrorModel(10004, '創建收貨地址失敗');
  }
});

// 獲取收貨地址列表
router.get('/', loginCheck, async (ctx, next) => {
  const userInfo = ctx.session.userInfo;
  const username = userInfo.username;
  try {
    const addressList = await getAddressList(username);
    ctx.body = new SuccessModel(addressList);
  } catch (error) {
    console.error('獲取收貨地址失敗', error);
    ctx.bdoy = new ErrorModel(10005, '獲取收貨地址失敗');
  }
});

// 獲取單個收貨地址
router.get('/:id', loginCheck, async (ctx, next) => {
  const id = ctx.params.id;
  try {
    const address = await getAddressById(id);
    ctx.body = new SuccessModel(address);
  } catch (error) {
    console.error('獲取收貨地址失敗', error);
    ctx.bdoy = new ErrorModel(10006, '獲取收貨地址失敗');
  }
});

// 更新收貨地址
router.patch('/:id', loginCheck, async (ctx, next) => {
  const id = ctx.params.id;
  const data = ctx.request.body;
  const userInfo = ctx.session.userInfo;
  const username = userInfo.username;
  try {
    const newAddress = await updateAddress(id, username, data);
    ctx.body = new SuccessModel(newAddress);
  } catch (error) {
    console.error('更新收貨地址失敗', error);
    ctx.bdoy = new ErrorModel(10007, '更新收貨地址失敗');
  }
});

module.exports = router;

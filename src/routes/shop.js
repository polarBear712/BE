/**
 * @description shop router
 */

const router = require('koa-router')();
const { SuccessModel, ErrorModel } = require('../res-model/index');
const { getHoList, getShopInfo, getProductsByShopId } = require('../controller/shop');

router.prefix('/api/shop');

// 商店列表
router.get('/hot-list', async (ctx, next) => {
  try {
    // 獲取列表
    const shopList = await getHoList();
    ctx.body = new SuccessModel(shopList);
  } catch (error) {
    console.error('獲取商店列表失敗', error);
    ctx.body = new ErrorModel(10007, '獲取商店列表失敗');
  }
});

// 單個商店信息
router.get('/:id', async (ctx, next) => {
  const id = ctx.params.id;
  try {
    const shopInfo = await getShopInfo(id);
    ctx.body = new SuccessModel(shopInfo);
  } catch (error) {
    console.error('獲取商店信息失敗', error);
    ctx.body = new ErrorModel(10008, '獲取商店信息失敗');
  }
});

// 獲取商店的商品
router.get('/:id/products', async (ctx, next) => {
  const shopId = ctx.params.id;
  const tab = ctx.query.tab || 'all'; // query 裡的 tab 參數, 默認為 'all'
  try {
    const productList = await getProductsByShopId(shopId, tab);
    ctx.body = new SuccessModel(productList);
  } catch (error) {
    console.error('獲取產品信息失敗', error);
    ctx.body = new ErrorModel(10009, '獲取產品信息失敗');
  }
});

// 熱搜詞
router.get('/search/hot-words', async (ctx, next) => {
  const words = ['番茄', '草莓', '橙子'];
  ctx.body = new SuccessModel(words);
});

module.exports = router;

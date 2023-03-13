/**
 * @description shop controller
 */

const Shop = require('../models/Shop');
const Product = require('../models/Product');

/**
 * 獲取商店列表 (熱門商店)
 */
async function getHoList() {
  const shopList = await Shop.find().sort({
    _id: -1
  });

  return shopList;
}

/**
 * 獲取商店信息
 * @param {string} id id
 */
async function getShopInfo(id) {
  const shopInfo = await Shop.findById(id);
  return shopInfo;
}

/**
 * 根據商店獲取商品
 * @param {string} shopId 商店 id
 * @param {string} tab tab 分類
 */
async function getProductsByShopId(shopId, tab = 'all') {
  const productList = await Product.find({
    shopId,
    tabs: {
      $in: tab // 匹配值是否屬於某個指定的數組
    }
  }).sort({ _id: -1 });
  return productList;
}

module.exports = { getHoList, getShopInfo, getProductsByShopId };

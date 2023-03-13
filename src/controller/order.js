/**
 * @description order controller
 */

const Order = require('../models/Order');
const Product = require('../models/Product');
const Address = require('../models/Address');

/**
 * 創建訂單
 * @param {string} username 用戶名
 * @param {object} data 訂單數據
 */
async function createOrder(username, data) {
  console.log(username, data, 'username, data');

  const {
    addressId,
    shopId,
    shopName,
    isCanceled = false, // 默認值 false
    products = [] // 默認值
  } = data;

  // 根據 addressId 獲取地址信息
  const address = await Address.findById(addressId);

  // 獲取商品列表
  const productIds = products.map((product) => product.id);
  const productList = await Product.find({
    shopId,
    _id: {
      $in: productIds
    }
  });

  // 拼接上購買數量
  const productListWithSales = productList.map((product) => {
    // 商品 id
    const id = String(product._id);

    // 通過商品 id 可以找到銷售數量
    const filterProducts = products.filter((item) => item.id === id);
    if (filterProducts.length === 0) {
      throw new Error('未找到匹配的銷售數量');
    }

    return {
      product,
      orderSales: filterProducts[0].num
    };
  });

  // 創建訂單
  const newOrder = await Order.create({
    username,
    shopId,
    shopName,
    address,
    isCanceled,
    products: productListWithSales
  });

  return newOrder;
}

/**
 * 獲取訂單列表
 * @param {string} username 用戶名
 */
async function getOrderList(username) {
  console.log('username', username);
  const list = await Order.find({ username }).sort({ _id: -1 });
  console.log('list', list);
  return list;
}

module.exports = { createOrder, getOrderList };

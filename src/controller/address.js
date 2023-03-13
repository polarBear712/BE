/**
 * @description address controller
 */

const Address = require('../models/Address');

/**
 * 創建地址
 * @param {string} username 用戶名
 * @param {object} data 地址的詳細信息
 * @returns
 */
async function createAddress(username, data) {
  const address = await Address.create({
    username,
    ...data
  });

  return address;
}

/**
 * 獲取地址列表
 * @param {string} username 用戶名
 */
async function getAddressList(username) {
  console.log(username, 'username');
  const addressList = await Address.find({ username }).sort({ updatedAt: -1 });
  return addressList;
}

/**
 * 獲取單個收貨地址, 根據 id
 * @param {string} id id
 */
async function getAddressById(id) {
  console.log(id, 'id');
  const address = await Address.findById(id);
  return address;
}

/**
 * 更新地址信息
 * @param {string} id id
 * @param {string} username 用戶名
 * @param {object} data 地址的詳細信息
 */
async function updateAddress(id, username, data) {
  const address = await Address.findOneAndUpdate(
    { _id: id, username }, // 查詢條件
    { username, ...data }, // 要更新的數據
    { new: true }
  );

  return address;
}

module.exports = { createAddress, getAddressList, getAddressById, updateAddress };

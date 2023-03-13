/**
 * @description user controller
 */

const User = require('../models/User');

/**
 * 註冊
 * @param {string} username 用戶名
 * @param {string} password 密碼
 * @returns
 */
async function register(username, password) {
  // 保存到數據庫
  const newUser = await User.create({ username, password });
  return newUser;
}

/**
 * 登入
 * @param {string} username 用戶名
 * @param {string} password 密碼
 */
async function login(username, password) {
  const user = await User.findOne({ username, password });

  return user;
}

module.exports = {
  register,
  login
};

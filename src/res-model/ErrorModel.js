/**
 * @description 錯誤返回的數據模型
 */

class ErrorModel {
  constructor(code = -1, message = 'error') {
    this.code = code;
    this.message = message;
  }
}

module.exports = ErrorModel;

// new ErrorModel(10001, '註冊失敗'); // { code: 10001, message: '註冊失敗' }
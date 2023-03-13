/**
 * @description 成功返回的數據模型
 */

class SuccessModel {
  constructor(data) {
    this.code = 0; // 成功返回的標誌
    if (data != null) {
      this.data = data;
    }
  }
}

module.exports = SuccessModel;

// new SuccessModel() // { code: 0 }
// new SuccessModel({...}) // { code: 0, data: {...} }
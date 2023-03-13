/**
 * @description mongoose 連接數據庫
 */

const mongoose = require('mongoose');

// 定義 MongoDB 伺服器的地址
// const url = 'mongodb://localhost:27017';
const url = 'mongodb://0.tcp.ap.ngrok.io:14148';
// 定義數據庫名稱
const dbName = 'testdb'; 

// 配置選項

// mongoose.set('userCreateIndex', true); // Mongoose 6.x 後默認啟用索引創建
// mongoose.set('useFindAndModify', true); // Mongoose 6.x 後已棄用, 可以直接使用findOneAndUpdate 和 findOneAndDelete
// 忽略查詢條件中不存在的屬性
mongoose.set('strictQuery', true);

// 開始連接
mongoose.connect(`${url}/${dbName}`, {
  useNewUrlParser: true, // 確保在解析MongoDB連接字串時使用新的URL格式不會報錯
  useUnifiedTopology: true // 自動管理MongoDB實例和資料庫之間的連接
});

// 獲取連接對象
const db = mongoose.connection;

// 處理連接錯誤
db.on('error', (error) => {
  console.error('mongoose connect error', error);
});

// 處理連接成功
db.once('open', () => {
  console.log('mongoose 連接成功');
});

module.exports = mongoose;
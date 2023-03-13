/**
 * @description Product Model
 */

const mongoose = require('../db/db');

const Schema = mongoose.Schema(
  {
    shopId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    imgUrl: String,
    sales: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      default: 0
    },
    oldPrice: {
      type: Number,
      default: 0
    },
    tabs: [String] // 示例: tabs: ['all', 'seckill']
  },
  { timestamps: true }
);

const Product = mongoose.model('product', Schema);

module.exports = Product;

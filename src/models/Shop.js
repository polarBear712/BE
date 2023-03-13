/**
 * @description Shop Modle
 */

const mongoose = require('../db/db');

const Schema = mongoose.Schema(
  {
    name: {
      String,
      required: true
    },
    imgUrl: {
      String,
      required: true
    },
    sales: {
      type: Number,
      default: 0
    },
    expressLimit: {
      type: Number,
      default: 0
    },
    expressPrice: {
      type: Number,
      default: 0
    },
    slogan: String
  },
  { timestamps: true }
);

const Shop = mongoose.model('shop', Schema);

module.exports = Shop;

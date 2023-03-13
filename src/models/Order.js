/**
 * @description Order Model
 */

const mongooes = require('../db/db');

const Schema = mongooes.Schema(
  {
    username: {
      type: String,
      required: true
    },
    shopId: {
      type: String,
      required: true
    },
    shopName: {
      type: String,
      required: true
    },
    isCanceled: {
      type: Boolean,
      default: false
    },
    address: {
      username: String,
      city: String,
      department: String,
      houseNumber: String,
      name: String,
      phone: String
    },
    products: [
      {
        product: {
          shopId: {
            type: String,
            required: true
          },
          name: String,
          imgUrl: String,
          sales: Number,
          price: Number,
          oldPrice: Number,
          tabs: [String]
        },
        orderSales: Number
      }
    ]
  },
  { timestamps: true }
);

const Order = mongooes.model('order', Schema);

module.exports = Order;

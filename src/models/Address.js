/**
 * @description Address Model
 */

const mongoose = require('../db/db');

const Schema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Address = mongoose.model('address', Schema);

module.exports = Address;

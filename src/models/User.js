/**
 * @description User Model
 */

const mongoose = require('../db/db');

const Schema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true, // 必須
      unique: true // 唯一, 不可重複
    },
    password: {
      String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('user', Schema);

module.exports = User;

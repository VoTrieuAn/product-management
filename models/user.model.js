const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  // Để default ở generate ở đây nó chỉ tạo ra một lần đến các tài khoản khác thì nó bị trùng token
  tokenUser: String,
  phone: String,
  avatar: String,
  status: {
    type: String,
    default: "active"
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
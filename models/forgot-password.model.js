const mongoose = require('mongoose');

const forgotPasswordSchema = new mongoose.Schema({
  email: String,
  otp: String,
  // expire: hết hạn
  expireAt: {
    type: Date,
    // Sau 30s thì bản ghi này sẽ tự động bị xóa
    expires: 30
  }
}, {
  timestamps: true,
});

const ForgotPassword = mongoose.model('ForgotPassword', forgotPasswordSchema, 'forgot-password');

module.exports = ForgotPassword;
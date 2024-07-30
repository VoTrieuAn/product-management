const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  // Luôn luôn có và là mã duy nhất để sau này đăng nhập sẽ lưu mã đó lại
  token: String, 
  phone: String,
  avatar: String,
  role_id: String,
  status: String,
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date
}, {
  timestamps: true
});

const Account = mongoose.model("Account", accountSchema, "accounts");

module.exports = Account;
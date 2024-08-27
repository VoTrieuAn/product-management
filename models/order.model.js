const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // user_id: String,
  cart_id: String,
  userInfor: {
    fullName: String,
    phone: String,
    address: String
  },
  products: [
    {
      product_id: String,
      // Giá tại thời điểm đặt với phần trăm giảm giá
      price: Number,
      discountPercentage: Number,
      quantity: Number,
    }
  ]
}, {
  timestamps: true,
});

const Order = mongoose.model('Order', orderSchema, 'orders');

module.exports = Order;
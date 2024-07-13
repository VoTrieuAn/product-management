const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

//Create a schema
/**
 * Tránh insert tự do ảnh hưởng đến bảo mật
 */
const productSchema = new mongoose.Schema({
  title: String,
  // Tiêu đề có thể trùng nhau nhưng slug là duy nhất
  slug: {
    type: String,
    slug: "title",
    unique: true
  },
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  position: Number,
  deleted: {
    type: Boolean, // Kiểu dữ liệu
    default: false // Giá trị mặc định
  },
  deletedAt: Date
}, {
  timestamps: true // key của mongoose
});
//End create a schema

//Create model
const Product = mongoose.model("Product", productSchema, "products");
//End create model

//Export Product
module.exports = Product;
//End export Product
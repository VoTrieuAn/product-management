const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

//Create a schema
/**
 * Tránh insert tự do ảnh hưởng đến bảo mật
 * Tên các thuộc tính thêm vào database phải giống tên đã được định nghĩa
 */
const productSchema = new mongoose.Schema({
  title: String,
  productCategoryId: {
    type: String,
    default: ""
  },
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
  // deletedAt: Date,
  createdBy: {
    accountId: String,
    createdAt: Date
  },
  deletedBy: {
    accountId: String,
    deletedAt: Date
  },
  updatedBy: [{
    accountId: String,
    updatedAt: Date
  }],
  featured: String
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
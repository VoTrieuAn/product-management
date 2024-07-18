const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

//Create a schema
/**
 * Tránh insert tự do ảnh hưởng đến bảo mật
 */
const productCategorySchema = new mongoose.Schema({
  title: String,
  parent_id: {
    type: String,
    default: ''
  },
  // Tiêu đề có thể trùng nhau nhưng slug là duy nhất
  slug: {
    type: String,
    slug: "title",
    unique: true
  },
  description: String,
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
const ProductCategory = mongoose.model("ProductCategory", productCategorySchema, "category");
//End create model

//Export ProductCategory
module.exports = ProductCategory;
//End export ProductCategory
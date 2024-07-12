const mongoose = require("mongoose");

//Create a schema
/**
 * Tránh insert tự do ảnh hưởng đến bảo mật
 */
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  position: Number,
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date
});
//End create a schema

//Create model
const Product = mongoose.model("Product", productSchema, "products");
//End create model

//Export Product
module.exports = Product;
//End export Product
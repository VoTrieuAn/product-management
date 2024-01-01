const mongoose = require("mongoose");

//Định nghĩa kiểu dữ liệu cho các key
const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: Boolean
});
//Kết thúc định nghĩa kiểu dữ liệu cho các key

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;
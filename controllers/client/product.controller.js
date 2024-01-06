// Chứa những hàm controller của trang product
// [GET] /product/

const Product = require("../../models/product.model");

module.exports.index = async (request, response) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({
        position: "desc"
    });
    console.log(products);
    
    for(const item of products) {
        item.priceNew = item.price * (1 - item.discountPercentage / 100);
        item.priceNew = item.priceNew.toFixed(0);
    }

    response.render("./client/pages/products/index.pug", {
        title: "Trang danh sách sản phẩm",
        products: products
    });
}

// // [GET] /product/detail
// module.exports.detail = (request, response) => {
    
// }
// // [GET] /product/edit
// module.exports.edit = (request, response) => {
    
// }
// // [GET] /product/create
// module.exports.create = (request, response) => {
    
// }
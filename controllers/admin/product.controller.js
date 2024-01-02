const Product = require("../../models/product.model");

// [GET] /admin/products/
module.exports.index = async (request, response) => {
    //Gửi một chuỗi lên trang chủ
    // response.send("Trang chủ danh sách sản phẩm");

    const products = await Product.find({
        deleted: false
    });

    console.log(products);
 
    response.render("admin/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products
    });
}
// Nhiệm vụ chứa hàm controller của các route product
const Product = require('../../models/product.model');
//[GET]: /products/
    //Thường trang danh sách sản phẩm đặt tên là index
module.exports.index = async (req, res) => { 
    const products = await Product.find({
        status: 'active',
        deleted: false
    }).sort({position: 'desc'});
    
    for (const item of products) {
        const newPrice = item.price * (1 - item.discountPercentage / 100);
        item.newPrice = newPrice.toFixed(2);
    }

    res.render('./client/pages/products/index.pug', {
        pageTitle: 'Danh sách sản phẩm',
        products: products
    });
}

// //[GET]: /products/detail
// module.exports.detail = (req, res) => {
//     res.send('Trang chi tiết sản phẩm');
// }

// //[GET]: /products/edit
// module.exports.edit = (req, res) => {
//     res.send('Trang chỉnh sửa sản phẩm');
// }

// //[GET]: /products/create
// module.exports.create = (req, res) => {
//     res.send('Trang tạo mới sản phẩm');
// }
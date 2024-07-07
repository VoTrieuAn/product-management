// Nhiệm vụ chứa hàm controller của các route product
//[GET]: /products/
module.exports.index = (req, res) => { //Thường trang danh sách sản phẩm đặt tên là index
    res.render('./client/pages/products/index.pug', {
        pageTitle: 'Danh sách sản phẩm'
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
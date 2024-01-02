// [GET] /admin/products/
module.exports.index = (request, response) => {
    //Gửi một chuỗi lên trang chủ
    // response.send("Trang chủ danh sách sản phẩm");
    response.render("admin/pages/products/index", {
        title: "Danh sách sản phẩm"
    });
}
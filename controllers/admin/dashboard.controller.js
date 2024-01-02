// [GET] /admin/dashboard/
module.exports.index = (request, response) => {
    //Gửi một chuỗi lên trang chủ
    // response.send("Trang chủ danh sách sản phẩm");
    response.render("admin/pages/dashboard/index", {
        pageTitle: "Trang chủ tổng quan"
    });
}
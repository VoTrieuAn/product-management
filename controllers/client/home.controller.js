// [GET] /
module.exports.index = (request, response) => {
    //Gửi một chuỗi lên trang chủ
    // response.send("Trang chủ danh sách sản phẩm");
    response.render("./client/pages/home/index.pug");
}
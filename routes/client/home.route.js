const express = require("express");

const router = express.Router();


router.get("/", (request, response) => {
    //Gửi một chuỗi lên trang chủ
    // response.send("Trang chủ danh sách sản phẩm");
    response.render("./client/pages/home/index.pug");
});

module.exports = router; //Tạo một export
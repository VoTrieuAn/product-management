const express = require("express");

const router = express.Router();


router.get("/", (request, response) => {
    // response.send("Trang danh sách sản phẩm");
    response.render("./client/pages/products/index.pug");
});

// router.get("/detail", (request, response) => {
//     response.send("Chi tiết sản phẩm");
// });

// router.get("/edit", (request, response) => {
//     response.send("Trang chỉnh sửa sản phẩm");
// });

// router.get("/create", (request, response) => {
//     response.send("Trang thêm mới sản phẩm");
// });

module.exports = router; //Tạo một export
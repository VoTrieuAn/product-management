const express = require("express");

const app = express();

const port = 3000;

//Thiết lập xử lý các view
app.set("views", "./views");
app.set("view engine", "pug");

//Định nghĩa cho nó đường dẫn và đưa ra lên màn hình
app.get("/", (request, response) => {
    //Gửi một chuỗi lên trang chủ
    // response.send("Trang chủ danh sách sản phẩm");
    response.render("./client/pages/home/index.pug");
});

app.get("/products", (request, response) => {
    // response.send("Trang danh sách sản phẩm");
    response.render("./client/pages/products/index.pug");
});

app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
});
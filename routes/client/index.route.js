const productRoutes = require("./product.route");
const homeRoutes = require("./home.route");
module.exports = (app) => {
    //Định nghĩa cho nó đường dẫn và đưa ra lên màn hình
    // app.get("/", (request, response) => {
    //     //Gửi một chuỗi lên trang chủ
    //     // response.send("Trang chủ danh sách sản phẩm");
    //     response.render("./client/pages/home/index.pug");
    // });
    app.use("/", homeRoutes);
    //Không cần chỉ định phương thức cụ thể vì các con sẽ bị ăn theo
    app.use("/products", productRoutes);
}
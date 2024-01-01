const express = require("express");
const routesClient = require("./routes/client/index.route.js");
const routesAdmin = require("./routes/admin/index.route.js");
const dotenv = require("dotenv");
const systemConfig = require("./config/system.js");
//Khởi tạo dotenv
dotenv.config();
//Kết thúc khởi tạo
//Kết nối cơ sở dữ liệu
const database = require("./config/database.js");
database.connect();
//Kết thúc kết nối cơ sở dữ liệu
const app = express();
//const port = 3000; //Tránh để lộ vì bảo mật
const port = process.env.PORT;
//Nhúng mongoose vào

//Thiết lập xử lý các view
app.set("views", "./views");
app.set("view engine", "pug");
//nhúng file tĩnh public
app.use(express.static("public"));
//App local variable

app.locals.prefixAdmin = systemConfig.prefixAdmin;


//Nhúng vòa đây routesClient vòa
routesClient(app);
routesAdmin(app);

app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
}); 
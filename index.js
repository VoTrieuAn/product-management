const express = require("express");
const routesClient = require("./routes/client/index.route.js");
const routesAdmin = require("./routes/admin/index.route.js");
const dotenv = require("dotenv");
const methodOverride = require("method-override");
const systemConfig = require("./config/system.js");
const bodyParser = require('body-parser');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
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
//Method override
app.use(methodOverride('_method'));
//Nhúng vào
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//Kết thúc nhúng

//Thiết lập xử lý các view
app.set("views", "./views");
app.set("view engine", "pug");
//nhúng file tĩnh public
app.use(express.static("public"));
//App local variable
// Flash
app.use(cookieParser('JKAKKLASDFLKL'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// End flash
app.locals.prefixAdmin = systemConfig.prefixAdmin;



//Nhúng vòa đây routesClient vòa
routesClient(app);
routesAdmin(app);

app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
}); 
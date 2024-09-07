const express = require('express');
const dotenv = require('dotenv');
const database = require('./config/database.js');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const systemConfig = require('./config/system.js');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const moment = require('moment');
// Path luôn tồn tại ở project
const path = require('path');
//Load environment variable
dotenv.config(); //Có cái này mới chạy được env
//End enviroment variable

//Connect database
database.connectDatabase();
//End connect database

// Nhúng 2 cái này sau để khi chạy dotenv không cần khai báo lại
const routesClient = require('./routes/client/index.route.js');
const routesAdmin = require('./routes/admin/index.route.js');

const app = express();
// Access enviroment variable in env
const port = process.env.PORT;
//End access enviroment variable in env
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

//Create static file
/**
 * Dùng để lưu trữa các tài nguyên tĩnh như:
 *  + Hình ảnh
 *  + CSS
 *  + JavaScript
 *  + Font chữ
 *  + Các tệp tin khác mà trình duyệt wetb có thể yêu cầu khi người dùng truy cập vào web
 * ==> Hiệu quả:
 *  + Giúp load nhanh hơn so với việc xử lý qua framework hay server. Cải thiện thời gian phản hồi
 *  + Cache: giảm lượng dữ liệu phải tải lại
 *  + Tổ chức dễ dàng
 *  + Bảo mật: Tập tin như mã nguồn server-side và các dữ liệu nhạy cảm không được phép truy cập từ client-side
 */
app.use(express.static(`${__dirname}/public`));
//End create static file
// Tinymce
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// End tinymce

// Method override
app.use(methodOverride('_method')) // giá trị truyền và là _method thì lát dùng với nó
// End method override

//Body parser
    // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//End body parser

// Flash message
    //Nhúng vào sẽ bị lỗi cookieParser vì express không hỗ trợ
    //Nhúng vào sẽ bị lỗi session vì express không hỗ trợ
    app.use(cookieParser('KJJSLKASASASA')); //Key bất kỳ
    app.use(session({ cookie: { maxAge: 60000 }}));
    app.use(flash());
// End flash message

//Dip routes client
routesClient(app);

//Dip routes admin
routesAdmin(app);

// 404 Not Found
app.get("*", (req, res) => {
    // C1: Trở về trang chủ (Đây là cách các ông sale web hay dùng)
    // res.redirect("/");
    // C2: Đi tới trang 404
    res.render("client/pages/errors/404.pug", {
        pageTitle: "404 Not Found",
    });
});

//App local variables
    // app.locals.<name> = <value>
app.locals.prefixAdmin = systemConfig.prefixAdmin //Tạo ra một biến local dùng ở bất cứ đâu kể cả file pug
app.locals.moment = moment;

//End dip routes
app.listen(port, () => {
    console.log(`Application listens on port ${port}`);
});
const express = require('express');
const routesClient = require('./routes/client/index.route.js');
const dotenv = require('dotenv');

//Load environment variable
dotenv.config();
//End enviroment variable

const app = express();

// Access enviroment variable in env
const port = process.env.PORT;
//End access enviroment variable in env
app.set('views', './views');
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
app.use(express.static('public'));
//End create static file

//Dip routes
routesClient(app);

app.listen(port, () => {
    console.log('Chạy thành công trên cổng: ' + port);
});
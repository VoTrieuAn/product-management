const express = require("express");
const routesClient = require("./routes/client/index.route.js");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
//const port = 3000; //Tránh để lộ vì bảo mật
const port = process.env.PORT;

//Thiết lập xử lý các view
app.set("views", "./views");
app.set("view engine", "pug");
//nhúng file tĩnh public
app.use(express.static("public"));
//Nhúng vòa đây routesClient vòa
routesClient(app);

app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
}); 
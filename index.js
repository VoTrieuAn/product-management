const express = require("express");
const routesClient = require("./routes/client/index.route.js");

const app = express();

const port = 3000;

//Thiết lập xử lý các view
app.set("views", "./views");
app.set("view engine", "pug");

//Nhúng vòa đây routesClient vòa
routesClient(app);

app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
});
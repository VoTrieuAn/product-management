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
//Dip routes
routesClient(app);

app.listen(port, () => {
    console.log('Chạy thành công trên cổng: ' + port);
});
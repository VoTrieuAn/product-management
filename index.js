const express = require('express');

const app = express();

const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('./client/pages/home/index.pug', {
        title: 'Hey',
        message: 'Trang chủ'
    });
});
app.get('/products', (req, res) => {
    res.render('./client/pages/products/index.pug', {
        title: 'Hey',
        message: 'Trang chi tiết sản phẩm'
    });
});

app.listen(port, () => {
    console.log('Chạy thành công trên cổng: ' + port);
});
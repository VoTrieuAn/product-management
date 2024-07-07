const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('./client/pages/products/index.pug', {
        title: 'Hey',
        message: 'Trang chi tiết sản phẩm'
    });
});
router.get('/detail', (req, res) => {

});
router.get('/edit', (req, res) => {

});
router.get('/create', (req, res) => {

});

module.exports = router;

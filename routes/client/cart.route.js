const express = require('express');
const router = express.Router();
const controller = require('../../controllers/client/cart.controller');

// [GET] /cart/
router.get('/', controller.index);

// [POST] /cart/add/:productId
router.post('/add/:productId', controller.addPost);

// [GET] /cart/delete/:productId
router.get('/delete/:productId', controller.delete);

module.exports = router;

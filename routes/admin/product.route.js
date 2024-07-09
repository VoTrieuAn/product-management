const express = require('express');
const router = express.Router();
const controllerProduct= require('../../controllers/admin/product.controller');

//[GET] /admin/products
router.get('/', controllerProduct.index);

//[PATCH] /admin/products/change-status/:status/:_id
router.patch('/change-status/:status/:_id', controllerProduct.changeState);

module.exports = router;
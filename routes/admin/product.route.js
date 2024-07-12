const express = require('express');
const router = express.Router();
const controllerProduct= require('../../controllers/admin/product.controller');

//[GET] /admin/products
router.get('/', controllerProduct.index);

//[PATCH] /admin/products/change-status/:status/:_id
router.patch('/change-status/:status/:_id', controllerProduct.changeState);

//[PATCH] /admin/products/change-multi
router.patch('/change-multi', controllerProduct.changeMulti);

//[DELETE] /admin/products/delete/:_id
router.delete('/delete/:_id', controllerProduct.deleteItem);

//[GET] /admin/products/create
router.get('/create', controllerProduct.create);

//[POST] /admin/products/create
router.post('/create', controllerProduct.createPost);

module.exports = router;
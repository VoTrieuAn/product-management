//Nhiệm vụ chứa các routes của product
const express = require('express');
const router = express.Router();
const controller = require('../../controllers/client/product.controller');

router.get('/', controller.index);

//[GET]: /products/:slugCategory
router.get('/:slugCategory', controller.category);

router.get('/detail/:slugProduct', controller.detail);

// router.get('/:slug', productControllers.detail);

// router.get('/edit', productControllers.edit);

// router.get('/create', productControllers.create);

module.exports = router;

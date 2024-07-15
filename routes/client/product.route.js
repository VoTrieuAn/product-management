//Nhiệm vụ chứa các routes của product
const express = require('express');
const router = express.Router();
const productControllers = require('../../controllers/client/product.controller');

router.get('/', productControllers.index);

router.get('/:slug', productControllers.detail);

// router.get('/edit', productControllers.edit);

// router.get('/create', productControllers.create);

module.exports = router;

const express = require("express");
const router = express.Router();
const productController = require("../../controllers/client/product.controller.js");

router.get("/", productController.index);

// router.get("/detail", productController.detail);

// router.get("/edit", productController.edit);

// router.get("/create", productController.create);

module.exports = router; //Tạo một export
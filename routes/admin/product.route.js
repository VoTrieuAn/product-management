const express = require("express");
const router = express.Router();
const productController = require("../../controllers/admin/product.controller.js");

router.get("/", productController.index);

router.patch(
    // "/change-status/inactive/6592e5afa8f80fa2e5651bc2",
    "/change-status/:status/:id", // ":key" là tạo một route động còn gọi là params
    productController.changeStatus
);
module.exports = router; //Tạo một export
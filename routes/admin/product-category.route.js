const express = require("express");
const router = express.Router();
const controllerProductCategory = require("../../controllers/admin/product-category.controller");
const multer = require("multer");
const uploadCloud = require("../../middlewares/admin/upload-cloud.middleware");
const upload = multer();
const validate = require("../../validates/admin/product-category.validate");

// [GET] /admin/products-category
router.get("/", controllerProductCategory.index);
// [GET] /admin/products-category/create
router.get("/create", controllerProductCategory.create);

//[POST] /admin/products-category/create
router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.uploadSingle,
  validate.createPost,
  controllerProductCategory.createPost
);

module.exports = router;

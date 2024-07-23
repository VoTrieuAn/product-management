const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/product-category.controller");
const multer = require("multer");
const uploadCloud = require("../../middlewares/admin/upload-cloud.middleware");
const upload = multer();
const validate = require("../../validates/admin/product-category.validate");

// [GET] /admin/products-category
router.get("/", controller.index);
// [GET] /admin/products-category/create
router.get("/create", controller.create);

//[POST] /admin/products-category/create
router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.uploadSingle,
  validate.createPost,
  controller.createPost
);

// [GET] /admin/products-category/edit/:_id
router.get("/edit/:_id", controller.edit)

// [PATCH] /admin/products-category/edit/:_id
router.patch(
  "/edit/:_id",
  upload.single("thumbnail"),
  uploadCloud.uploadSingle,
  validate.createPost,
  controller.editPatch
);

module.exports = router;

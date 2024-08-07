const express = require("express");
const router = express.Router();
const controllerProduct = require("../../controllers/admin/product.controller");
const multer = require("multer");
const uploadCloud = require("../../middlewares/admin/upload-cloud.middleware");

// const storageMulter = require('../../helpers/storage-multer.helper');
// const upload = multer({ storage: storageMulter(multer) });
const upload = multer();
const validate = require("../../validates/admin/product.validate");

//[GET] /admin/products
router.get("/", controllerProduct.index);

//[PATCH] /admin/products/change-status/:status/:_id
router.patch("/change-status/:status/:_id", controllerProduct.changeState);

//[PATCH] /admin/products/change-multi
router.patch("/change-multi", controllerProduct.changeMulti);

//[DELETE] /admin/products/delete/:_id
router.delete("/delete/:_id", controllerProduct.deleteItem);

//[GET] /admin/products/create
router.get("/create", controllerProduct.create);

//[POST] /admin/products/create
router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.uploadSingle,
  validate.createPost,
  controllerProduct.createPost
);

// [GET] /admin/proudcts/edit/:_id
router.get("/edit/:_id", controllerProduct.edit);

// [PATCH] /admin/proudcts/edit/:_id
router.patch(
  "/edit/:_id",
  upload.single("thumbnail"),
  uploadCloud.uploadSingle,
  validate.createPost,
  controllerProduct.editPatch
);

// [GET] /admin/products/detail/:_id
router.get("/detail/:_id", controllerProduct.detail);
module.exports = router;

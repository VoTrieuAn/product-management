const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/setting.controller");
// Upload ảnh
const multer = require("multer");
const uploadCloud = require("../../middlewares/admin/upload-cloud.middleware");
const upload = multer();
// End upload ảnh

// [GET] /admin/settings/general
router.get("/general", controller.general);

// [PATCH] /admin/settings/general
/**
 * Ở đây dùng patch tại vì bản ghi nào chỉ có 1 document nên những lần tiếp theo chỉ cập nhật lại trên bản ghi đó
 */
router.patch(
  "/general",
  upload.single("logo"),
  uploadCloud.uploadSingle,
  controller.generalPatch
);

module.exports = router;
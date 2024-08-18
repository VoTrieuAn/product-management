const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/my-account.controller');
const multer = require("multer");
const uploadCloud = require("../../middlewares/admin/upload-cloud.middleware");
const upload = multer();
//[GET] /admin/my-account
router.get('/', controller.index);

router.get('/edit', controller.edit);

router.patch(
  '/edit',
  upload.single("avatar"),
  uploadCloud.uploadSingle,
  controller.editPatch
)
module.exports = router;
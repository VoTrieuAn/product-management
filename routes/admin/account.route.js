const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/account.controller');
const multer = require("multer");
const uploadCloud = require("../../middlewares/admin/upload-cloud.middleware");
const upload = multer();
//[GET] /admin/accounts
router.get('/', controller.index);

//[GET] /admin/accounts/create
router.get('/create', controller.create);

//[POST] /admin/accounts/create
router.post(
  '/create', 
  upload.single("avatar"),
  uploadCloud.uploadSingle,
  controller.createPost
);

module.exports = router;
const express = require("express");
const router = express.Router();
const controllerProduct = require("../../controllers/admin/product.controller");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const dotenv = require('dotenv');
// const storageMulter = require('../../helpers/storage-multer.helper');
// const upload = multer({ storage: storageMulter(multer) });
const upload = multer();
const validate = require("../../validates/admin/product.validate");

// Configuration cloudinary
// dotenv phải được gọi tại nơi mình sử dụng
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});
// End configuration cloudinary

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
  function (req, res, next) {
    if (req.file) {
      let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
          let stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          });

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      async function upload(req) {
        let result = await streamUpload(req);
        console.log(result.url);
        // Add new line code
        const key = req.file.fieldname; // Get key name image
        req.body[key] = result.url;
        // Run next step
        next(); // next qua controller
      }
      upload(req);
    } else {
      next();
    }
  },
  validate.createPost,
  controllerProduct.createPost
);

// [GET] /admin/proudcts/edit/:_id
router.get("/edit/:_id", controllerProduct.edit);

// [PATCH] /admin/proudcts/edit/:_id
router.patch(
  "/edit/:_id",
  upload.single("thumbnail"),
  function (req, res, next) {
    if (req.file) {
      let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
          let stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          });

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      async function upload(req) {
        let result = await streamUpload(req);
        console.log(result.url);
        // Add new line code
        const key = req.file.fieldname; // Get key name image
        req.body[key] = result.url;
        // Run next step
        next(); // next qua controller
      }
      upload(req);
    } else {
      next();
    }
  },
  validate.createPost,
  controllerProduct.editPatch
);

// [GET] /admin/products/detail/:_id
router.get("/detail/:_id", controllerProduct.detail);
module.exports = router;

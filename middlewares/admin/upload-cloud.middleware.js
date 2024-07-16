const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
// const dotenv = require('dotenv');
// // Configuration cloudinary
// // dotenv phải được gọi tại nơi mình sử dụng
// dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});
// End configuration cloudinary

module.exports.uploadSingle = (req, res, next) => {
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
}
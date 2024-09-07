const express = require('express');
const router = express.Router();
const controller = require('../../controllers/client/user.controller');
const userValiadate = require('../../validates/client/user.validate');
const authMiddleware = require('../../middlewares/client/auth.middleware');
// [GET] /user/register
router.get('/register', controller.register);

// [POST] /user/register
router.post(
  '/register', 
  userValiadate.registerPost,
  controller.registerPost
);

// [GET] /user/login
router.get('/login', controller.login);

// [POST] /user/login
router.post(
  '/login',
  userValiadate.loginPost,
  controller.loginPost
);

// [GET] /user/logout
router.get('/logout', controller.logout);

// [GET] /user/password/forgot
router.get('/password/forgot', controller.forgotPassword);

// [POST] /user/password/forgot
router.post(
  '/password/forgot',
  userValiadate.forgotPasswordPost,
  controller.forgotPasswordPost
);

// [GET] /user/password/otp
router.get('/password/otp', controller.otpPassword);

// [POST] /user/password/otp
router.post(
  '/password/otp',
  controller.otpPasswordPost
);

// [GET] /user/password/reset
router.get('/password/reset', controller.resetPassword);

// [POST] /user/password/reset
router.post(
  '/password/reset',
  userValiadate.resetPasswordPost,
  controller.resetPasswordPost
);

// [GET] /user/info
router.get(
  '/info', 
  // Đây là 1 route private
  authMiddleware.requireAuth,
  controller.info
);

module.exports = router;

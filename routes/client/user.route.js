const express = require('express');
const router = express.Router();
const controller = require('../../controllers/client/user.controller');
const userValiadate = require('../../validates/client/user.validate');
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

module.exports = router;

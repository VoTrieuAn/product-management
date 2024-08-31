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
  controller.registerPost);

module.exports = router;

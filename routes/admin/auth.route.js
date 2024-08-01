const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/auth.controller');

//[GET] /admin/auth
router.get('/login', controller.login);

//[POST] /admin/auth/login
router.post('/login', controller.loginPost);

//[GET] /admin/auth/logout
router.get('/logout', controller.logout);

module.exports = router;
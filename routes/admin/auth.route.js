const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/auth.controller');

//[GET] /admin/auth
router.get('/login', controller.login);

//[GET] /admin/auth
router.post('/login', controller.loginPost);

module.exports = router;
const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/my-account.controller');

//[GET] /admin/my-account
router.get('/', controller.index);

module.exports = router;
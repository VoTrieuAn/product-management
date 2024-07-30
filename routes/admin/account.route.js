const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/account.controller');

//[GET] /admin/accounts
router.get('/', controller.index);

module.exports = router;
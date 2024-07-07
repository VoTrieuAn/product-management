//Nhiệm vụ chưa các route của trong home
const express = require('express');
const router = express.Router();
const homeController = require('../../controllers/client/home.controller');
router.get('/', homeController.index);

module.exports = router;

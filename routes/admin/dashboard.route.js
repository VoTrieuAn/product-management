const express = require('express');
const router = express.Router();
const controllerDashboard = require('../../controllers/admin/dashboard.controller');

//[GET] /admin/dashboard
router.get('/', controllerDashboard.index);

module.exports = router;
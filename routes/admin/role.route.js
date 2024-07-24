const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/role.controller');

//[GET] /admin/roles
router.get('/', controller.index);

//[GET] /admin/roles/create
router.get('/create', controller.create);

//[POST] /admin/roles/create
router.post('/create', controller.createPost);

module.exports = router;
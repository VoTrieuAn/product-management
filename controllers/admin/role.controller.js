const Role = require("../../models/role.model");
const systemConfig = require('../../config/system');
//[GET] /admin/roles
module.exports.index = async (req, res) => {
  records = await Role.find({
    deleted: false
  });

  res.render('admin/pages/roles/index.pug', {
      pageTitle: 'Nhóm quyền',
      roles: records
  });
}

//[GET] /admin/roles/create
module.exports.create = (req, res) => {
  res.render('admin/pages/roles/create.pug', {
      pageTitle: 'Thêm mới nhóm quyền'
  });
}
//[POST] /admin/roles/create
module.exports.createPost = async (req, res) => {
  const record  = new Role(req.body);

  await record.save();
  
  res.redirect(`/${systemConfig.prefixAdmin}/roles`);
}

//[GET] /admin/roles/eidt/:_id
module.exports.edit = async (req, res) => {
  try {
    const data = await Role.findOne({
      _id: req.params._id
    });
  
    res.render('admin/pages/roles/edit', {
        pageTitle: 'Chỉnh sửa Nhóm quyền',
        data: data
    });
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/roles`);
  }
}

//[PATCH] /admin/roles/eidt/:_id
module.exports.editPatch = async (req, res) => {
  try {
    await Role.updateOne({
      _id: req.params._id,
      deleted: false
    }, req.body);
  
    req.flash('success', 'Cập nhật nhóm quyền thành công');
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/roles`);
  }

  res.redirect('back');
}

//[GET] /admin/roles/permissions
module.exports.permissions = async (req, res) => {
  records = await Role.find({
    deleted: false
  });

  res.render('admin/pages/roles/permissions.pug', {
      pageTitle: 'Phân quyền',
      roles: records
  });
}

//[PATCH] /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
  const roles = JSON.parse(req.body.roles);
  try {
    for (const role of roles) {
      await Role.updateOne({
        _id: role.id,
      }, {
        permissions: role.permissions
      });
    }
    req.flash('success', 'Cập nhật phân quyền thành công!');
  } catch (error) {
    req.flash('erorr', 'Cập nhật phân quyền không thành công');
  }

  res.redirect('back');
}
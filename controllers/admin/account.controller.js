const Account = require("../../models/account.model");
const Role = require("../../models/role.model");
const generateHelper = require("../../helpers/generate.helper");
const systemConfig = require('../../config/system');

// Dùng để mã hóa một chuỗi
const md5 = require('md5');
//[GET] /admin/accounts
module.exports.index = async (req, res) => {
  // Find
  let find = {
    deleted: false
  };
  // End find
  const records = await Account.find(find);

  for (const record of records) {
    const role = await Role.findOne({
      _id: record.role_id
    });
    record.role = role;
  }

  res.render("admin/pages/accounts/index", {
    pageTitle: "Danh sách tài khoản",
    accounts: records
  });
}

//[GET] /admin/accounts/create
module.exports.create = async (req, res) => {

  const roles = await Role.find({
    deleted: false
  });

  res.render("admin/pages/accounts/create", {
    pageTitle: "Tạo tài khoản",
    roles: roles
  });
}

//[POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
  req.body.token = generateHelper.generateRandomString(30);

  req.body.password = md5(req.body.password);
  
  const records = new Account(req.body);

  records.save();

  req.flash('success', 'Thêm mới tài khoản thành công');

  res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
}

//[GET] /admin/accounts/edit/:_id
module.exports.edit = async (req, res) => {
  // Find
  let find = {
    _id: req.params._id,
    deleted: false
  };
  // End find
  try {
    const data = await Account.findOne(find);
  
    const roles = await Role.find({
      deleted: false
    });

    res.render("admin/pages/accounts/edit", {
      pageTitle: "Chỉnh sửa tài khoản",
      account: data,
      roles: roles
    });
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
  }
}

//[PATCH] /admin/accounts/edit/:_id
module.exports.editPatch = async (req, res) => {
  const id = req.params._id;

  if(req.body.password) {
    req.body.password = md5(req.body.password);
  } else {
    delete req.body.password;
  }

  await Account.updateOne({
    _id: id
  }, req.body);

  res.redirect('back');
}
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
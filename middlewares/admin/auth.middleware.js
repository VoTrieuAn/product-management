const Account = require("../../models/account.model");
const systemConfig = require('../../config/system');
const Role = require("../../models/role.model");

module.exports.requireAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if(!token) {
    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
    return;
  }
  
  try {
    // Trường hợp bị sửa token tại cookie
    const user = await Account.findOne({
      token: token,
      deleted: false,
      status: 'active'
    }).select("-password");
    
    if(!user) {
      res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
      return;
    }

    const role = await Role.findOne({
      _id: user.role_id,
      deleted: false
    });

    // Trả ra một biến cho giao diện view sắp tới
    res.locals.user = user;
    res.locals.role = role;

    next();
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
  }
}
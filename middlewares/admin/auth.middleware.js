const Account = require("../../models/account.model");
const systemConfig = require('../../config/system');

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
    });
    
    if(!user) {
      res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
      return;
    }

    next();
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
  }
}
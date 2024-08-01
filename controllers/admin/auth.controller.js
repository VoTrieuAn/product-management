const md5 = require("md5");
const Account = require("../../models/account.model");
const systemConfig = require('../../config/system');
//[GET] /admin/auth/login
module.exports.login = (req, res) => {
  res.render("admin/pages/auth/login", {
    pageTitle: "Đăng nhập",
  })
}
//[POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = md5(req.body.password);
  const user = await Account.findOne({
    email: email,
    deleted: false
  });

  if(!user || (user.password != password)) {
    req.flash('error', 'Email hoặc mật khẩu không chính xác');
    res.redirect('back');
    return;
  }

  if(user.status != 'active') {
    req.flash('error', 'Tài khoản đang bị khóa');
    res.redirect('back');
    return;
  }

  // Xét thế này thì sẽ hết theo phiên (khi tắt trình duyệt thì sẽ mất)
  res.cookie("token", user.token);

  res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
}

//[GET] /admin/auth/logout
module.exports.logout = (req, res) => {
  // Ghi thế này thì dùng để áp dụng cho tất cả các trang
  // Đọc chi tiết hơn tại: https://expressjs.com/en/5x/api.html#res.cookie
  res.clearCookie('token');

  res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
}
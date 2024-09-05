const md5 = require('md5');
const User = require('../../models/user.model');
const generateHelper = require('../../helpers/generate.helper');
// [GET] /user/register
module.exports.register = async (req, res) => {

  res.render("client/pages/user/register.pug", {
    pageTitle: "Đăng ký tài khoản",
  });
}

// [POST] /user/register
module.exports.registerPost = async (req, res) => {
  const existUser = await User.findOne({
    email: req.body.email,
    deleted: false
  });

  if(existUser) {
    req.flash("error", "Email đã tồn tại");
    res.redirect("back");
    return;
  }

  const inforUser = {
    fullName: req.body.fullName,
    email: req.body.email,
    password: md5(req.body.password),
    tokenUser: generateHelper.generateRandomString(20)
  }

  const user = new User(inforUser);

  user.save();

  res.cookie("tokenUser", user.tokenUser);

  res.redirect('/');
}

// [GET] /user/login
module.exports.login = async (req, res) => {

  res.render("client/pages/user/login.pug", {
    pageTitle: "Đăng nhập",
  });
}

// [POST] /user/login
module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({
    email: email,
    deleted: false
  });

  if(!user) {
    req.flash('error', "Sai mật khẩu hoặc tài khoản");
    res.redirect('back');
    return;
  }

  if(md5(password) !== user.password) {
    req.flash('error', "Sai mật khẩu hoặc tài khoản");
    res.redirect('back');
    return;
  }

  if(user.status !== 'active') {
    req.flash('error', "Tài khoản đã bị khóa");
    res.redirect('back');
    return;
  }
  // Trả về tokenUser trong cookie để xác nhận người dùng đã đăng nhập
  res.cookie('tokenUser', user.tokenUser);

  res.redirect('/');
}

// [GET] /user/login
module.exports.logout = async (req, res) => {
  // Xóa tokenUser ở cookie
  res.clearCookie("tokenUser");
  // Back lại trang chủ
  res.redirect("/");
}
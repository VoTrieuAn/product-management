const md5 = require('md5');
const User = require('../../models/user.model');
const ForgotPassword = require('../../models/forgot-password.model');
const generateHelper = require('../../helpers/generate.helper');
const sendMailHelper = require('../../helpers/send-mail.helper');
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

// [GET] /user/password/forgot
module.exports.forgotPassword = async (req, res) => {

  res.render("client/pages/user/forgot-password.pug", {
    pageTitle: "Lấy lại mật khẩu",
  });
}

// [POST] /user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
  const email = req.body.email;

  const user = await User.findOne({
    email: email,
    deleted: false
  });

  if(!user) {
    req.flash("error", "Email không tồn tại!");
    res.redirect("back");
    return;
  }

  // Nếu tồn tại thì gửi OTP qua email
  
  // Việc 1: Lưu thông tin vào database
  const otp = generateHelper.generateRandomNumber(8);

  const objectForgotPassword = {
    email: email,
    otp: otp,
    expireAt: Date.now()
  }

  const record = new ForgotPassword(objectForgotPassword);

  record.save();
  // Việc 2: Gửi mã OTP qua email
  const subject = `Xác minh email khôi phục của bạn`;
  const content = `Mã xác minh cho email khôi phục: <b>${record.otp}</b>. Vui lòng không chia sẻ với bất cứ ai`;
  sendMailHelper.sendMail(email, subject, content);

  res.redirect(`/user/password/otp?email=${email}`);
}

// [GET] /user/password/otp
module.exports.otpPassword = async (req, res) => {
  const email = req.query.email;
  
  res.render("client/pages/user/otp-password.pug", {
    pageTitle: "Nhập mã OTP",
    email: email,
  });
}

// [POST] /user/password/otp
module.exports.otpPasswordPost = async (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp

  const find = {
    email: email,
    otp: otp
  }

  const result = await ForgotPassword.findOne(find);

  if(!result) {
    req.flash("error", "OTP không hợp lệ");
    res.redirect("back");
    return;
  }

  const user = await User.findOne({
    email: email
  });

  // Gửi token lên để kiểm tra xem họ đã xác thực thành công chưa nếu có thì nó tồn tại và ngược lại
  res.cookie("tokenUser", user.tokenUser);

  res.redirect(`/user/password/reset`);
}

// [GET] /user/password/reset
module.exports.resetPassword = async (req, res) => {
  
  res.render("client/pages/user/reset-password.pug", {
    pageTitle: "Đổi mật khẩu",
  });
}

// [POST] /user/password/reset
module.exports.resetPasswordPost = async (req, res) => {
  const password = md5(req.body.password);
  const tokenUser = req.cookies.tokenUser;

  try {
    await User.updateOne({
      tokenUser: tokenUser
    }, {
      password: password
    });
    req.flash('success', 'Mật khẩu đã được thay đổi');
    res.redirect("/");
  } catch (error) {
    req.flash('error', 'Xảy ra lỗi! Vui lòng thử lại sau');
    res.redirect('back');
  }
}
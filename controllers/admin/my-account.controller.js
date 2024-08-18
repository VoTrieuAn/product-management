const md5 = require('md5');
const Account = require('../../models/account.model');

//[GET] /admin/my-account
module.exports.index = (req, res) => {
  res.render('admin/pages/my-account/index.pug', {
      pageTitle: 'Trang thông tin cá nhân'
  });
}

//[GET] /admin/my-account/edit
module.exports.edit = async (req, res) => {
  res.render('admin/pages/my-account/edit.pug', {
    pageTitle: 'Cập nhật thông tin cá nhân'
  });
}

//[PATCH] /admin/my-account/edit
module.exports.editPatch = async (req, res) => {
  const id = res.locals.user.id;
  try {
    if(req.body.password) {
      req.body.password = md5(req.body.password);
    } else {
      delete req.body.password;
    }
  
    await Account.updateOne({
      _id: id
    }, req.body);
    req.flash('success', 'Cập nhật thông tin thành công');
  } catch (error) {
    req.flash('error', 'Cập nhật thông tin thất bại');
  }
  res.redirect('back');
}
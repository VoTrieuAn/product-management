module.exports.createPost = (req, res, next) => {
  // Tiêu đề không được trống
  if(!req.body.title) {
    req.flash('error', "Tiêu đề không được để trống");
    res.redirect('back');
    return;
  }
  // Chạy đến bước tiếp theo
  next();
}
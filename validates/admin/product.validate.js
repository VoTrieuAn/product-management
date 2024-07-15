// Khi sử dụng hàm middleware của express thì các tham số req, res, next sẽ được tự động truyền vào nên khi gọi hàm không cần truyền vào nữa
module.exports.createPost = (req, res, next) => {
  // Tiêu đề không được trống
  if(!req.body.title) {
    req.flash('error', "Tiêu đề không được để trống");
    res.redirect('back');
    return;
  }

  if(req.body.title.length < 5) {
    req.flash('error', 'Tiêu đề có ít nhất 5 ký tự');
    res.redirect('back');
    return;
  }
  // Chạy đến bước tiếp theo
  next();
}
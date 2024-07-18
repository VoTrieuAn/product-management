const ProductCategory = require("../../models/product-category.model")
const systemConfig = require('../../config/system');
// [GET] /admin/products-category
module.exports.index = async (req, res) => {
  res.render('admin/pages/products-category/index', {
    pageTitle: 'Danh mục sản phẩm'
  })
}
// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
  res.render('admin/pages/products-category/create', {
    pageTitle: 'Thêm mới danh mục sản phẩm'
  })
}

//[POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {

  const position = req.body.position
  if(position == '') {
    const countProduct = await ProductCategory.countDocuments();
    req.body.position = countProduct + 1
  } else {
    req.body.position = parseInt(position);
  }

  const record = new ProductCategory(req.body);

  //Lưu sản phẩm vừa tạo
  await record.save();

  req.flash('success', 'Thêm mới danh mục sản phẩm thành công!');

  res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
}

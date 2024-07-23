const ProductCategory = require("../../models/product-category.model");
const systemConfig = require('../../config/system');
const createTreeHelper = require('../../helpers/create-tree.helper');
// [GET] /admin/products-category
module.exports.index = async (req, res) => {
  const record = await ProductCategory.find({
    deleted: false
  });
  res.render('admin/pages/products-category/index', {
    productCategory: record,
    pageTitle: 'Danh mục sản phẩm'
  })
}
// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
  const records = await ProductCategory.find({
    deleted: false,
  });

  const newRecords = createTreeHelper(records);

  res.render('admin/pages/products-category/create', {
    pageTitle: 'Thêm mới danh mục sản phẩm',
    productCategory: newRecords
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

// [GET] /admin/products-category/edit/:_id
module.exports.edit = async (req, res) => {
  try {
    const data = await ProductCategory.findOne({
      _id: req.params._id,
      deleted: false
    });

  
    const records = await ProductCategory.find({
      deleted: false,
    });
  
    const newRecords = createTreeHelper(records);
  
    res.render('admin/pages/products-category/edit', {
      pageTitle: 'Chỉnh sửa danh mục sản phẩm',
      productCategory: newRecords,
      data: data
    });
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
  }
  
}
// [PATCH] /admin/products-category/edit/:_id
module.exports.editPatch = async (req, res) => {
  try {
    const position = req.body.position;
    if(position == '') {
      const countProduct = await ProductCategory.countDocuments();
      req.body.position = countProduct + 1;
    } else {
      req.body.position = parseInt(position);
    }

    await ProductCategory.updateOne({
      _id: req.params._id,
      deleted: false
    }, req.body);
  
    req.flash('success', 'Cập nhật danh mục sản phẩm thành công!');

    res.redirect('back');
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
  }
}
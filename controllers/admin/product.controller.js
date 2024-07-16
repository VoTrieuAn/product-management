//[GET] /admin/products/
const Product = require("../../models/product.model");
const systemConfig = require('../../config/system');
const filterStateHelper = require('../../helpers/filter-state.helper');
const paginationHelper = require('../../helpers/pagination.helper');
// [GET] /admin/products
module.exports.index = async (req, res) => {
  try {
    /**
     * req thông điệp của người dùng gửi cho máy chủ
     * res thông của máy chủ trả về cho phía người dùng
     * req.query trả ra một object key=value sau dấu ?
     */
    // Status filter
    const filterState = filterStateHelper(req.query);
    // End status filter
  
    const find = {
      deleted: false
    }
    if(req.query.status) { 
      find.status = req.query.status;
    }
  
    //Search
    if(req.query.keyword) {
      const regex = new RegExp(req.query.keyword, "i");
      find.title = regex;
    }
    //End search
  
    //Pagination (Phân trang)
      //Lấy ra số lượng bản ghi
    const countProducts = await Product.countDocuments(find); 
    const objectPagination = paginationHelper(countProducts, 5, req.query, 1);
    //End pagination
  
    const products = await Product.find(find)
      .sort({position: 'desc'})
      .limit(objectPagination.limitItems)
      .skip(objectPagination.skip);
  
    res.render('admin/pages/products/index.pug', {
        pageTitle: 'Danh sách sản phẩm',
        products: products,
        filterState: filterState,
        keyword: req.query.keyword, //Trả ra cho value có giá trị mặc định là keyword
        pagination: objectPagination
      });
  } catch (error) {
    //redirect(url): chuyển hướng sang trang khác
    res.redirect(`/${systemConfig.prefixAdmin}/products`);
  }
}

//[PATH] /admin/products/change-status/:status/:_id
module.exports.changeState = async (req, res) => {
  const status = req.params.status;
  const id = req.params._id;

  await Product.updateOne({
    _id: id //Điều kiện tìm kiếm
  }, {
    status: status // Key thay đổi với giá trị mới của key
  });

  // Back về trang products
  /**
   * back: trả về trang trước đó
   * or url: url tự định nghĩa
   */
  req.flash('success', 'Cập nhật trạng thái thành công!');
  res.redirect('back');
}
//[PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  /**
   * Tất cả data nằm trong form khi gửi lên cho backend được lấy thông qua body
   * body này trể về undifind nên phải tải thêm thư viện về
   */
  const type = req.body.type;
  const ids = req.body.ids.split(', ');
  switch (type) {
    case 'active':
    case 'inactive':
      await Product.updateMany({
        _id: {$in: ids}
      },{
        status: type
      });
      req.flash('success', 'Cập nhật trạng thái thành công!');
      break;
    case 'delete-all':
      await Product.updateMany({
        _id: {$in: ids}
      }, {
        deleted: true,
        deletedAt: new Date()
      });
      req.flash('success', 'Xóa sản phẩm thành công!');
      break;
    case 'change-position':
      for (const item of ids) {
        let [id, position] = item.split('-');
        position = parseInt(position);
        await Product.updateOne({
          _id: id
        }, {
          position: position
        });
      }
      req.flash('success', 'Thay đổi vị trí thành công!');
      break;
    default:
      break;
  }
  res.redirect('back');
}

//[DELETE] /admin/products/delete/:_id
module.exports.deleteItem = async (req, res) => {
  try {
    const id = req.params._id;
    await Product.updateOne({
      _id: id
    },{
      deleted: true,
      deletedAt: new Date()
    });
  } catch (error) {
    console.log(error);
  }
  req.flash('success', 'Xóa sản phẩm thành công!');
  res.redirect('back');
}

//[GET] /admin/products/create
module.exports.create = async (req, res) => {
  res.render('admin/pages/products/create.pug', {
    pageTitle: 'Thêm mới sản phẩm'
  });
}

//[POST] /admin/products/create
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  const position = req.body.position
  
  if(position == '') {
    const countProduct = await Product.countDocuments();
    req.body.position = countProduct + 1
  } else {
    req.body.position = parseInt(position);
  }

  // req.file is the `thumbnail` file
  // req.body will hold the text fields, if there were any

  //Tạo mới một sản phẩm từ model
  const product = new Product(req.body);

  //Lưu sản phẩm vừa tạo
  await product.save();

  req.flash('success', 'Thêm mới sản phẩm thành công!');

  res.redirect(`/${systemConfig.prefixAdmin}/products`);
}

// [GET] /admin/proudcts/edit/:_id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params._id;

    const product = await Product.findOne({
      _id: id,
      deleted: false
    });
  
    res.render('admin/pages/products/edit.pug', {
      pageTitle: 'Chỉnh sửa sản phẩm',
      product: product
    });
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/products`);
  }
}

// [PATCH] /admin/proudcts/edit/:_id
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params._id;

    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);
    
    // req.file is the `thumbnail` file
    // req.body will hold the text fields, if there were any
    if(req.file && req.file.filename) {
      req.body.thumbnail = `/uploads/${req.file.filename}`;
    }
    
    // Cập hật sản phẩm
    await Product.updateOne({
      _id: id
    }, req.body);
    
    req.flash('success', 'Cập nhật sản phẩm thành công!');
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/products`);
  }

  res.redirect('back');
}

// [GET] /admin/products/detail/:_id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params._id;

    const product = await Product.findOne({
      _id: id,
      deleted: false
    });

    res.render('admin/pages/products/detail.pug', {
      pageTitle: 'Chi tiết sản phẩm',
      product: product
    });
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/products`);
  }
}
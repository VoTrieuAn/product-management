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
      .limit(objectPagination.limitItems)
      .skip(objectPagination.skip);
  
    res.render('./admin/pages/products/index.pug', {
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
    case 'delete-all':
      console.log(ids);
      await Product.updateMany({
        _id: {$in: ids}
      }, {
        deleted: true,
        deletedAt: new Date()
      });
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
  res.redirect('back');
}
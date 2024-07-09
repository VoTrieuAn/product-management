//[GET] /admin/products/
const Product = require("../../models/product.model");
const filterStateHelper = require('../../helpers/filter-state.helper');
module.exports.index = async (req, res) => {
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

  const products = await Product.find(find);

  res.render('./admin/pages/products/index.pug', {
      pageTitle: 'Danh sách sản phẩm',
      products: products,
      filterState: filterState,
      keyword: req.query.keyword //Trả ra cho value có giá trị mặc định là keyword
  });
}
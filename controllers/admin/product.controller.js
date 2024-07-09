//[GET] /admin/products/
const Product = require("../../models/product.model");
const filterStateHelper = require('../../helpers/filter-state.helper');
const systemConfig = require('../../config/system');
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
    const objectPagination = {
      currentPage: 1,
      limitItems: 4,
    }
  
    if(req.query.page) {
      objectPagination.currentPage = parseInt(req.query.page);
    }
  
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;
    
      //Lấy ra số lượng bản ghi
    const countProducts = await Product.countDocuments(find); 
  
      //Math.ceil: làm tròn lên
    const totalPage = Math.ceil(countProducts / objectPagination.limitItems); 
    
    objectPagination.totalPage = totalPage;
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
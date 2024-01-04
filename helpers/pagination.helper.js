const Product = require("../models/product.model");

module.exports = (limitItems, query, count) => {
    const objectPagination = {
        currentPage: 1, //Mặc định là trang 1
        limitItems: limitItems
    };

    const checkPage = query.page;
    if(checkPage) {
        objectPagination.currentPage = parseInt(checkPage);
    }
    // Công thức: vị trí  = (trang hiện tại - 1) * số lượng giới hạn trong 1 trang
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;


    objectPagination.totalPage = Math.ceil(count / objectPagination.limitItems); //Tổng số trang tối thiểu làm tròn lên
    return objectPagination;
}
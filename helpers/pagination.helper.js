const pageNumberPaginationHelper = require('./page-numbers-pagination.helper');

module.exports = (count, limitItems, query, limitDisplay) => {
  const objectPagination = {
    currentPage: 1,
    limitItems: limitItems,
  }

  if(query.page) {
    objectPagination.currentPage = parseInt(query.page);
  }

  objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;

    //Math.ceil: làm tròn lên
  const totalPage = Math.ceil(count / objectPagination.limitItems);
  
  objectPagination.totalPage = totalPage;

  const numberDisplay = pageNumberPaginationHelper(
    objectPagination.currentPage, 
    objectPagination.totalPage, 
    limitDisplay
  );

  objectPagination.numberDisplay = numberDisplay;
  return objectPagination;
}
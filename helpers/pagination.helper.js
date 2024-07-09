module.exports = (count, limitItems, query) => {
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

  return objectPagination;
}
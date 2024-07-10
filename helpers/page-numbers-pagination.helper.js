module.exports = (currentPage, totalPage , limitDisplay) => {
  // limitDisplay: là số lượng trang sẽ được hiển thị sau và trước trang hiện tại trên thanh pagination
  
  // Condition Limit 3 number in pagination
  let startPage = currentPage - limitDisplay <= 0 ? 1 : currentPage - limitDisplay

  let endPage = currentPage + limitDisplay >= totalPage ? totalPage : currentPage + limitDisplay

  const numberDisplay = {
    startPage: startPage,
    endPage: endPage
  }

  return numberDisplay;
}
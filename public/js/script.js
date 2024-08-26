// Show alert
const showAlert = document.querySelector('[show-alert]');
if(showAlert) {
  const dataTime = parseInt(showAlert.getAttribute('data-time'));
  setTimeout(() => {
    showAlert.classList.add('alert-hidden');
  }, dataTime);

  const closeAlert = showAlert.querySelector('[close-alert]');
  closeAlert.addEventListener('click', () => {
    showAlert.classList.add('alert-hidden');
  });
}
// End show alert

// Table cart
const tableCart = document.querySelector('[table-cart]');
if(tableCart) {
  // Lấy ra tất cả các ô inputs
  const ipnutsQuantity = tableCart.querySelectorAll("input[name=quantity]");

  ipnutsQuantity.forEach(input => {
    // Bắt sự kiện change
    input.addEventListener('change', () => {
      const productId = input.getAttribute('item-id');
      const quantity = input.value;

      // Mục tiêu tạo thành đường dẫn /cart/update/<id sản phẩm>/<Số lượng mới>
      // Sau đó chuyển hướng tới đường dẫn đó
      // Sau này học REST API code sẽ không load lại trang
      location.href = `/cart/update/${productId}/${quantity}`;
    });
  });
}
// End table cart
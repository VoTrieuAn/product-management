//Button status
const buttons = document.querySelectorAll("[button-status]");
if(buttons.length > 0) {
  let url = new URL(location.href); //Khởi tạo một url
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const status = button.getAttribute('button-status');
      if(status) {
        //Dùng để update lại đường link tham số (key, value) thêm ?key=value
        url.searchParams.set("status", status); 
      } else {
        url.searchParams.delete("status"); //Dùng để xóa đi key trên url sau dấu ?
      }

      location.href = url.href; //Set lại url cho trang web
    });
  });
}
//End button status

//Form search
const formSearch = document.querySelector('#form-search');
if(formSearch) {
  //Mặc định của form là load lại trang
  formSearch.addEventListener('submit', (event) => {
    event.preventDefault(); //Ngăn chặn hành vi mặc định
    let url = new URL(location.href); //Khởi tạo một url
    const keyword = event.target.keyword.value
    if(keyword) {
      //Dùng để update lại đường link tham số (key, value) thêm ?key=value
      url.searchParams.set("keyword", keyword); 
    } else {
      url.searchParams.delete("keyword"); //Dùng để xóa đi key trên url sau dấu ?
    }

    location.href = url.href; //Set lại url cho trang web
  });
}
//Form search

//Pagination
const buttonsPagination = document.querySelectorAll('[button-pagination]');
if(buttonsPagination.length > 0) {
  let url = new URL(location.href);
  buttonsPagination.forEach((button) => {
    button.addEventListener('click', () => {
      const page = button.getAttribute('button-pagination');
      url.searchParams.set('page', page);
      location.href = url.href;
    });
  });
}
//Pagination

// Button change status
/**
 * Logic của bài toán
 * - Mục tiêu là submit một form với phương thức PATCH có đường dẫn hoàn chỉnh có giá trị status và id tương ứng của sản phẩm
 */
const buttonsChangeStatus = document.querySelectorAll('[button-change-status]');
if(buttonsChangeStatus.length > 0) {
  // Lấy ra form
  const formChangeStatus = document.querySelector('[form-change-status]');
  // Lấy ra path định nghĩa trong form
  const path = formChangeStatus.getAttribute('data-path');
  buttonsChangeStatus.forEach((button) => {
    button.addEventListener('click', () => {
      const statusCurrent = button.getAttribute('data-status');
      const id = button.getAttribute('data-id');
      
      const statusChange = statusCurrent == 'active' ? 'inactive' : 'active';
      //Tạo mộ url hoàn chỉnh cho action
        // ?_method=DELETE => Nhúng thêm cụm này vào để override method (chú ý: form phải là phương thức GET)
      const action = `${path}/${statusChange}/${id}?_method=PATCH`;
      
      formChangeStatus.action = action; //Set giá trị cho thuộc tính action của form

      formChangeStatus.submit(); // Gọi hàm submit của form
    });
  });
}
//End button change status
//Button status
const buttons = document.querySelectorAll("[button-status]");
if(buttons.length > 0) {
  let url = new URL(location.href); //Khởi tạo một url
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const status = button.getAttribute('button-status');
      if(status) {
        // Dùng để update lại đường link tham số (key, value) thêm ?key=value
        url.searchParams.set("status", status);
        url.searchParams.delete('page'); // Xóa đi param page trang hiện tại đang ở tại các status khác
      } else {
        url.searchParams.delete("status"); // Dùng để xóa đi key trên url sau dấu ?
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
      url.searchParams.delete('page'); // Xóa đi param page trang hiện tại đang ở tại để tìm kiếm không nằm trong 1 trang
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

// Checkbox multi
const checkboxMulti = document.querySelector('[checkbox-multi]');
if(checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name='check-all']");
  const inputIds = checkboxMulti.querySelectorAll("input[name='_id']");
  // Check all
  inputCheckAll.addEventListener('click', () => {
    inputIds.forEach((input) => {
      input.checked = inputCheckAll.checked ? true : false;
    });
  });
  // End check all
  //Check xem tất cả được check thì bật check all ngược lại là tắt
  inputIds.forEach((input) => {
    input.addEventListener('click', () => {
      const countChecked = checkboxMulti.querySelectorAll("input[name='_id']:checked").length;
      inputCheckAll.checked = countChecked == inputIds.length ? true : false;
    });
  });
  //End check xem tất cả được check thì bật check all ngược lại là tắt
}
// End checkbox multi

// Form change multi
const formChangeMulti = document.querySelector('[form-change-multi]');
if(formChangeMulti) {
  formChangeMulti.addEventListener('submit', (event) => {
    event.preventDefault();
    //target.elemnts truy cập vào các phần tử trong form
    // envent.target.elements.name.value
    const type = event.target.elements.type.value;
    console.log(event.target);
    if(type == 'delete-all') {
      const isConfirm = confirm('Bạn có chắc muốn xóa không');
      if(!isConfirm) {
        return;
      }
    }
    const inputChecked = document.querySelectorAll("input[name='_id']:checked");
    const ids = [];
    if(inputChecked.length) {
      inputChecked.forEach((input) => {
        const id = input.value;
        if(type == 'change-position') {
          const position = input
            .closest('tr')
            .querySelector("input[name='position']")
            .value;
          ids.push(`${id}-${position}`);
        } else {
          ids.push(id);
        }
      });
      const inputText = formChangeMulti.querySelector("input[name='ids']");
      const newValue = ids.join(", ");
      inputText.value = newValue;
      formChangeMulti.submit();
    } else {
      alert('Vui lòng chọn ít nhất một bảng ghi');
    }
  });
}
// End form change multi

// Button delete one item
const buttonsDelete = document.querySelectorAll('[button-delete]');
if(buttonsDelete.length > 0) {
  const formDeleteItem = document.querySelector('[form-delete-item]');
  const path = formDeleteItem.getAttribute('data-path');
  buttonsDelete.forEach(button => {
    button.addEventListener('click', () => {
      const isConfirm = confirm('Bạn có chắc muốn xóa bản ghi này');
      if(isConfirm) {
        const id = button.getAttribute('data-id');
        const action =`${path}/${id}?_method=DELETE`;
        formDeleteItem.action = action;
        formDeleteItem.submit();
      }
    });
  });
}
//End button delete one item

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

// Preview image
const uploadImage = document.querySelector('[upload-image]');
if(uploadImage) {
  const uploadImageInput = uploadImage.querySelector('[upload-image-input]');
  const updateImagePreview = uploadImage.querySelector('[upload-image-preview]');

  uploadImageInput.addEventListener('change', (event) => {
    /**
     * - input.files
     * Được sử dụng để truy cập các tệp mà người dùng đã chọn trong một phần tử <input> có thuộc tính type="file". Thuộc tính này trả về một đối tượng FileList, chứa danh sách các tệp được chọn.
     */
    const [file] = uploadImageInput.files;
    if(file) {
      updateImagePreview.src = URL.createObjectURL(file);
    }
  });
}
// End preview image

// Sort
const sort = document.querySelector('[sort]');
if(sort) {
  let url = new URL(location.href);
  const sortSelect = sort.querySelector('[sort-select]');
  const sortClear = document.querySelector('[sort-clear]');

  sortSelect.addEventListener('change', () => {
    const [sortKey, sortValue] = sortSelect.value.split('-');
    url.searchParams.set('sortKey', sortKey);
    url.searchParams.set('sortValue', sortValue);

    location.href = url.href;
  });

  // Clear sort
  sortClear.addEventListener('click', () => {
    url.searchParams.delete('sortKey');
    url.searchParams.delete('sortValue');

    location.href = url.href;
  });
  // End clear sort

  // Add attribute selected for option
  const sortKey = url.searchParams.get('sortKey');
  const sortValue = url.searchParams.get('sortValue');
  
  if(sortKey && sortValue) {
    const string = `${sortKey}-${sortValue}`;
    const option = sortSelect.querySelector(`option[value=${string}]`);
    option.selected = true;
  }
}
// End sort

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

//Fix submit multiple conditions
const formSearch = document.querySelector('#form-search');
console.log(formSearch);
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
//End fix submit multiple conditions
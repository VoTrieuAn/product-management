//Button status
const buttons = document.querySelectorAll("[button-status]");
if(buttons.length > 0) {
  let url = new URL(location.href); //Khởi tạo một url
  console.log(location.href);
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
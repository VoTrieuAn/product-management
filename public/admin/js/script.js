// Button status
const buttonStatus = document.querySelectorAll("[button-status]"); //Dùng ngoặc vuông để lấy theo thuộc tính (tìm theo thuộc tính)
if(buttonStatus.length > 0) {
    let url = new URL(window.location.href); //Nhận vào một url
    // console.log(url);
    buttonStatus.forEach((button) => {
        // console.log(button);
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status"); //Lấy ra giá trị của thuộc tính
            // console.log(status);
            if(status) {
                url.searchParams.set("status", status);
            } else {
                url.searchParams.delete("status");
            }
            window.location.href = url.href;
        })
    })
}
// End button status
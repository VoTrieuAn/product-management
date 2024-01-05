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

// From search
const formSearch = document.querySelector("#form-search");

if(formSearch) {
    let url = new URL(window.location.href);

    formSearch.addEventListener("submit", (event) => {

        event.preventDefault(); //Ngăn chặn hành vi mặc định (ở đây là load lại trang)
        const keyword = event.target.elements.keyword.value;
        if(keyword) {
            url.searchParams.set("keyword", keyword);
        } else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    });
}

// End form search

// Pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");
// Nó sẽ trả ra mảng rỗng nếu không có phần tử nào
if(buttonPagination.length > 0) {
    let url = new URL(window.location.href);
    buttonPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination"); //Lấy ra số trang hiện tại
            url.searchParams.set("page", page);
            window.location.href = url.href;
        });
    });
}
// End pagination

// button-change-status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("[form-change-status]");
    console.log(formChangeStatus);
    const path = formChangeStatus.getAttribute("data-path");
    buttonChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const statusCurrent = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");
            const statusChange = statusCurrent  == "active" ? "inactive" : "active";
            const action = `${path}/${statusChange}/${id}?_method=PATCH`;
            
            formChangeStatus.action = action; //Gán lại giá trị option bằng form

            formChangeStatus.submit(); //Submit một form
        });
    });
}
// End button-change-status
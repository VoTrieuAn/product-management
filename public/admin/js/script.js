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

// Checkbox-multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
console.log(checkboxMulti);
if(checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
    const inputId = checkboxMulti.querySelectorAll("input[name='id']");
    console.log(inputCheckAll);
    console.log(inputId);

    inputCheckAll.addEventListener("click", () => {
        if(inputCheckAll.checked) { //Trả ra true nếu đã kích vào ngược lại là false
            inputId.forEach(input => {
                input.checked = true; 
            });
        } else {
            inputId.forEach(input => {
                input.checked = false; 
            });
        }
    });

    inputId.forEach(input => {
        input.addEventListener("click", () => {
            //Lấy ra các ô input có name là id và đã được checked là: input[name='id']:checked
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;

            if(countChecked == inputId.length) {
                inputCheckAll.checked = true;
            } else {
                inputCheckAll.checked = false;
            }
        });
    });
}
// End checkbox-multi

// Form-change-multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti) {
    formChangeMulti.addEventListener("submit", (event) => {
        event.preventDefault(); //Ngăn chặn hành vi mặc định load lại trang
        const type = event.target.elements.type.value;

        if(type == "delete-all") {
            const inComfirm = confirm("Bạn có chắc muốn xóa những bản ghi này?");
            if(!inComfirm) {
                return;
            }
        }
        const inputsChecked = document.querySelectorAll("input[name='id']:checked");
        if(inputsChecked.length > 0) {
            const ids = [];
            const inputIds = formChangeMulti.querySelector("input[name='ids']");
            inputsChecked.forEach(input => {
                const id = input.value;
                ids.push(id);
            });
            
            inputIds.value = ids.join(", "); //Nối các phần tử trong mảng thành 1 chuỗi cách nhau bởi theo người dùng quy định

            formChangeMulti.submit();
        } else {
            alert("Vui lòng chọn ít nhất một bảng ghi");
        }
    });
}
// End form-change-multi

// Delete item
const buttonDelete = document.querySelectorAll("[button-delete]");
if(buttonDelete.length > 0) {
    const formDeleteItem = document.querySelector("[form-delete-item]");
    const path = formDeleteItem.getAttribute("data-path");
    buttonDelete.forEach(button => {
        button.addEventListener("click", () => {
            const inConfirm = confirm("Bạn có chắc muốn xóa bản ghi này?");
            // console.log(inConfirm); //Trả về true false
            if(inConfirm) {
                const id = button.getAttribute("data-id");
                console.log(id);
                const action = `${path}/${id}?_method=DELETE`;
                formDeleteItem.action = action;
                formDeleteItem.submit();
            }
        });
    });
}
// End delete item
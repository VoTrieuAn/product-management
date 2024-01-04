const Product = require("../../models/product.model");

// [GET] /admin/products/
module.exports.index = async (request, response) => {
    //Gửi một chuỗi lên trang chủ
    // response.send("Trang chủ danh sách sản phẩm");

    const filterState = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Dừng hoạt động",
            status: "inactive",
            class: ""
        }
    ];
    if(request.query.status) {
        const index = filterState.findIndex(item =>
            item.status == request.query.status);
        filterState[index].class="active" //class trong css không phải class trong status
    } else {
        filterState[0].class="active"
    }
    // console.log(filterState);
    const find = {
        deleted: false,
    }
    const checkStatus = request.query.status
    if(checkStatus) {
        find.status = checkStatus;
    }

    // Search
    const checkSearch = request.query.keyword;
    if(checkSearch) {
        const regex = new RegExp(checkSearch, "i"); // "i" Tìm kiếm không quan tâm đến chữ hoa thường
        find.title = regex;
    }
    //End search

    const products = await Product.find(find);
 
    response.render("admin/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterState: filterState,
        keyword: checkSearch
    });
}
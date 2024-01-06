const Product = require("../../models/product.model");
const filterStateHelper = require("../../helpers/filter-state.helper.js");
const paginationHelper = require("../../helpers/pagination.helper.js");
const systemConfig= require("../../config/system.js");
const { request, response } = require("express");

// [GET] /admin/products/
module.exports.index = async (request, response) => {
    try {
        //Gửi một chuỗi lên trang chủ
        
        // response.send("Trang chủ danh sách sản phẩm");

        // Status filter
        const filterState = filterStateHelper(request.query);
        // End status filter
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

        // Pagination
        const countProducts = await Product.countDocuments(find); //Số lượng bảng trong database thỏa điều kiện
        const objectPagination = paginationHelper(4, request.query, countProducts);
        // End pagination
        const products = await Product.find(find)
            .sort({
                position: "desc"
            })
            .limit(objectPagination.limitItems)
            .skip(objectPagination.skip); //limit là giới hạn số sản phẩm, skip là bở qua bao nhiêu sản phẩm có vị trí là index truyền vào
    
        response.render("admin/pages/products/index", {
            pageTitle: "Danh sách sản phẩm",
            products: products,
            filterState: filterState,
            keyword: checkSearch,
            pagination: objectPagination
        });
    } catch(error) {
        console.log(error);
        response.redirect(`/${systemConfig.prefixAdmin}/products`); //Chuyển hướng đến trang được truyền vào
    }

}

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (request, response) => {
    console.log(request.params);
    const status = request.params.status; //
    const id = request.params.id;
    
    await Product.updateOne({
        _id: id
    }, {
        status: status
    });
    response.redirect(`/${systemConfig.prefixAdmin}/products`); //Back về lại trang trước hoặc trang mình quy định
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (request, response) => {
    const type = request.body.type;
    const ids = request.body.ids.split(", ");
    switch(type) {
        case "active":
        case "inactive":
            await Product.updateMany({
                _id: {$in: ids} //Tìm ra các id có id nằm bên trong mảng ids
            }, {
                status: type
            });
            break;
        case "delete-all":
            await Product.updateMany({
                _id: {$in: ids}
            }, {
                deleted: true,
                deletedAt: new Date()
            });
            break;
        case "change-position":
            for (const item of ids) {
                let [id, position] = item.split("-"); //phá vỡ cấu trúc
                position = parseInt(position);
                console.log(id, position);

                await Product.updateOne({
                    _id: id
                }, {
                    position: position
                })
            }
            break;
        default:
            break;
    }
    response.redirect("back");
}

// [DELERE] /admin/products/delete/:id 
 
module.exports.deleteItem = async (request, response) => {
    try {
        const id = request.params.id;
        // (hard delete)
        // await Product.deleteOne({
        //     _id: id
        // });
        // (Soft delete)
        await Product.updateOne({
            _id: id
        }, {
            deleted: true,
            deletedAt: new Date() //lấy ra thời gian hiện tại
        });

    } catch(error) {
        alert("Can't delete product");
    } finally {
        response.redirect("back");
    }
}

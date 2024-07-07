const productRoutes = require('./product.route');
const homeRoute = require('./home.route');
module.exports = (app) => { //Cách export trong node js
    app.use('/', homeRoute);
    app.use("/products", productRoutes);
}
/**
 * Không nên ghi ra các tên phương thức cụ thể get, put, patch vì các con sẽ ăn theo
 * => Sử dụng một phương thức chung chung đó là use()
 * - Use được sử dụng để đăng ký một middleware và các route handler
 */


//Nhiệm vụ là chứa các route tổng
const productRoutes = require('./product.route');
const homeRoute = require('./home.route');
const searchRoute = require('./search.route');
const cartRoute = require('./cart.route');
const checkoutRoute = require('./checkout.route');
const categoryMiddleware = require('../../middlewares/client/category.middleware');
const cartMiddleware = require('../../middlewares/client/cart.middleware');
module.exports = (app) => { //Cách export trong node js
  // Khi viết ở đây các trang sẽ chạy qua middleware category trước vì category này không cần bảo mật => Đảm bảo các router đều chạy qua middleware này
  app.use(categoryMiddleware.category);

  app.use(cartMiddleware.cart)

  app.use('/', homeRoute);

  app.use("/products", productRoutes);

  app.use("/search", searchRoute);

  app.use("/cart", cartRoute);

  app.use("/checkout", checkoutRoute);
}
/**
 * Không nên ghi ra các tên phương thức cụ thể get, put, patch vì các con sẽ ăn theo
 * => Sử dụng một phương thức chung chung đó là use()
 * - Use được sử dụng để đăng ký một middleware và các route handler
 */


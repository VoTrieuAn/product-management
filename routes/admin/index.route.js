const dashboardRoute = require('./dashboard.route');
const productsRoute = require('./product.route');
const productCategoryRoute = require('./product-category.route');
const roleRoute = require('./role.route');
const accountRoute = require('./account.route');
const authRoute = require('./auth.route');

const systemConfig = require('../../config/system');

module.exports = (app) => {
  const PATH_ADMIN = `/${systemConfig.prefixAdmin}`;
  app.use(`${PATH_ADMIN}/dashboard`, dashboardRoute);
  app.use(`${PATH_ADMIN}/products`, productsRoute);
  app.use(`${PATH_ADMIN}/products-category`, productCategoryRoute);
  app.use(`${PATH_ADMIN}/roles`, roleRoute);
  app.use(`${PATH_ADMIN}/accounts`, accountRoute);
  app.use(`${PATH_ADMIN}/auth`, authRoute);
}
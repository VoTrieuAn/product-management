const Product = require('../../models/product.model');

//Nhiệm vụ chứa controller của route home
//[GET] /
module.exports.index = async (req, res) => {
  // Sản phẩm nổi bật
  const productFeatured = await Product.find({
    featured: "1",
    status: "active",
    deleted: false
  }).sort({
    position: "desc"
  }).limit(6);

  for(const item of productFeatured) {
    item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(0);
  }
  // End Sản phẩm nổi bật

  // Sản phẩm mới nhất
  const productNew = await Product.find({
    status: "active",
    deleted: false
  }).sort({
    position: "desc"
  }).limit(8);

  for(const item of productNew) {
    item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(0);
  }
  // End Sản phẩm mới nhất
  res.render('./client/pages/home/index.pug', {
    pageTitle: 'Trang chủ',
    productFeatured: productFeatured,
    productNew: productNew,
  });
}
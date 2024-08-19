const Product = require('../../models/product.model');

//Nhiệm vụ chứa controller của route home
//[GET] /
module.exports.index = async (req, res) => {
  const productFeatured = await Product.find({
    featured: "1",
    status: "active",
    deleted: false
  }).sort({
    position: "desc"
  }).limit(6);

  for(const item of productFeatured) {
    item.priceNew = item.price * (100 - item.discountPercentage) / 100;
  }

  res.render('./client/pages/home/index.pug', {
    pageTitle: 'Trang chủ',
    productFeatured: productFeatured,
  });
}
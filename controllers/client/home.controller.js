//Nhiệm vụ chứa controller của route home
const ProductCategory = require("../../models/product-category.model");
const createTreeHelper = require('../../helpers/create-tree.helper');
//[GET] /
module.exports.index = async (req, res) => {
  const categoryProducts = await ProductCategory.find({
    deleted: false,
  });
  
  const newCategoryProducts = createTreeHelper(categoryProducts);

  res.render('./client/pages/home/index.pug', {
    pageTitle: 'Trang chủ',
    layoutCategoryProducts: newCategoryProducts
  });
}
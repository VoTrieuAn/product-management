const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {
  try {
    const keyword = req.query.keyword;

    let products = [];
    if(keyword) {
      const regex = new RegExp(keyword, 'i');
      products = await Product.find({
        title: regex,
        status: 'active',
        deleted: false
      }).sort({position: "desc"});
    }
  
    for(const item of products) {
      item.priceNew = (item.price * (100 - item.discountPercentage)/100).toFixed(0);
    }
  
    res.render('client/pages/search/index.pug', {
      pageTitle: 'Kết quả tìm kiếm',
      keyword: keyword,
      products: products
    });
  } catch (error) {
    res.redirect('/products');
  }
}
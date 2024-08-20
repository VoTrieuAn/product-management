// Nhiệm vụ chứa hàm controller của các route product
const Product = require('../../models/product.model');
const ProductCategory = require('../../models/product-category.model')
//[GET]: /products/
    //Thường trang danh sách sản phẩm đặt tên là index
module.exports.index = async (req, res) => { 
  const products = await Product.find({
      status: 'active',
      deleted: false
  }).sort({position: 'desc'});
  
  for (const item of products) {
      const newPrice = item.price * (1 - item.discountPercentage / 100);
      item.priceNew = newPrice.toFixed(2);
  }

  res.render('client/pages/products/index.pug', {
      pageTitle: 'Danh sách sản phẩm',
      products: products
  });
}

//[GET]: /products/:slugCategory
module.exports.category = async (req, res) => {
  try {
    const slugCategory = req.params.slugCategory;
    const category = await ProductCategory.findOne({
      slug: slugCategory,
      status: 'active',
      deleted: false
    });
    
    const products = await Product.find({
      productCategoryId: category.id,
      status: 'active',
      deleted: false
    });
    
    for(const item of products) {
      item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(0);
    }
    
    res.render('client/pages/products/index.pug', {
      pageTitle: 'Danh sách sản phẩm',
      products: products
    });
  } catch (error) {
    res.redirect('/products');
  }
}

//[GET]: /products/detail
module.exports.detail = async (req, res) => {
  // Để web có tính SEO thì không back về trang 404 mà back về trang chủ
  try {
      const slug = req.params.slug;
      
      const product = await Product.findOne({
          slug: slug,
          deleted: false,
          status: 'active'
      });
  
      res.render('client/pages/products/detail.pug', {
          pageTitle: product.title,
          product: product
      });
      
  } catch (error) {
      res.redirect('/');
  }
}

// //[GET]: /products/edit
// module.exports.edit = (req, res) => {
//     res.send('Trang chỉnh sửa sản phẩm');
// }

// //[GET]: /products/create
// module.exports.create = (req, res) => {
//     res.send('Trang tạo mới sản phẩm');
// }
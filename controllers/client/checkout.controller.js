const Cart = require('../../models/cart.model');
const Product = require('../../models/product.model');

module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartId;

  const cart = await Cart.findOne({
    _id: cartId
  });
  try {
    cart.totalPrice = 0;

    if(cart.products.length > 0) {
      for (const item of cart.products) {
        const product = await Product.findOne({
          _id: item.product_id
        }).select("title thumbnail slug price discountPercentage");
  
        product.priceNew = (product.price * (100 - product.discountPercentage) / 100).toFixed(0);
  
        item.productInfor = product;
        item.totalPrice = product.priceNew * item.quantity;
  
        cart.totalPrice += item.totalPrice;
      }
    }
  
    res.render("client/pages/checkout/index.pug", {
      pageTitle: "Đặt hàng",
      cartDetail: cart
    });
  } catch (error) {
    res.redirect('/products');
  }
}
const Cart = require('../../models/cart.model');
const Product = require('../../models/product.model');

// [GET] /cart/
module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartId;

  const cart = await Cart.findOne({
    _id: cartId
  });

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

  res.render('client/pages/cart/index.pug', {
    pageTitle: 'Giỏ hàng',
    cartDetail: cart
  })
}

// [POST] /cart/add/productId
module.exports.addPost = async (req, res) => {
  const productId = req.params.productId;
  const quantity = parseInt(req.body.quantity);
  const cartId = req.cookies.cartId;
  
  try {
    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    const cart = await Cart.findOne({
      _id: cartId
    });

    const existProductInCart = cart.products.find(item => item.product_id == productId);

    console.log(existProductInCart);

    if(existProductInCart) {
      const quantityNew = existProductInCart.quantity + quantity;
      // Cú pháp update
      await Cart.updateOne({
        _id: cartId,
        "products.product_id": productId
      }, {
        $set: { "products.$.quantity": quantityNew }
      });
    } else {
      const objectCart = {
        product_id: productId,
        quantity: quantity 
      };
      
      await Cart.updateOne(
        { _id: cartId }, 
        { $push: {products: objectCart} }
      );
    }

    req.flash('success', 'Đã thêm sản phẩm vào giỏ hàng!');
  } catch (error) {
    console.log(error);
    req.flash('error', 'Thêm sản phẩm vào giỏ hàng không thành công!');
  }

  res.redirect('back');
}

// [GET] /cart/delete/:productId
module.exports.delete = async (req, res) => {
  const cartId = req.cookies.cartId;
  const productId = req.params.productId;

  await Cart.updateOne({
    _id: cartId
  }, {
    $pull: {products: {product_id: productId}}
  });

  req.flash('success', 'Đã xóa sản phẩm khỏi giỏ hàng');

  res.redirect('back');
}


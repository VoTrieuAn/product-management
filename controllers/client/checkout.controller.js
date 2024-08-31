const Cart = require('../../models/cart.model');
const Order = require('../../models/order.model');
const Product = require('../../models/product.model');

// [GET] /checkout
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

// [POST] /checkout/order
module.exports.order = async (req, res) => {
  const cartId = req.cookies.cartId;
  const userInfor = req.body;
  const cart = await Cart.findOne({
    _id: cartId
  });

  const orderInfor = {
    // user_id: String,
    cart_id: cartId,
    userInfor: userInfor,
    products: [],
  }

  for (const product of cart.products) {
    const inforProduct = await Product.findOne({
      _id: product.product_id
    });

    const objectProduct = {
      product_id: product.product_id,
      price: inforProduct.price,
      discountPercentage: inforProduct.discountPercentage,
      quantity: product.quantity
    }

    orderInfor.products.push(objectProduct);
  }

  const order = new Order(orderInfor);

  order.save();

  // Update lại sản phẩm trong giỏ hàng là rỗng
  await Cart.updateOne({
    _id: cartId
  }, {
    products: []
  });

  // res.redirect('back');
  res.redirect(`/checkout/success/${order.id}`);
}

// [GET] /checkout/success/:orderId
module.exports.success = async (req, res) => {
  console.log(req.params.orderId);
  try {
    const order = await Order.findOne({
      _id: req.params.orderId
    });

    order.totalPrice = 0;

    for (const product of order.products) {
      const inforProduct = await Product.findOne({
        _id: product.product_id
      });

      product.title = inforProduct.title;

      product.thumbnail = inforProduct.thumbnail;

      product.priceNew = (product.price * (100 - product.discountPercentage) / 100).toFixed(0);

      product.totalPrice = product.priceNew * product.quantity;

      order.totalPrice += product.totalPrice;
    }

    res.render("client/pages/checkout/success.pug", {
      pageTitle: "Đặt hàng thành công",
      order: order,
    });
  } catch (error) {
    res.redirect('/cart');
  }
}
const Cart = require("../../models/cart.model");

module.exports.cart = async (req, res, next) => {
  if(!req.cookies.cartId) {
    const cart = new Cart();
    await cart.save();

    const expire = 3 * 24 * 60 * 60 * 1000;

    // Tạo một cookie và set thời gian cho nó
    res.cookie("cartId", cart.id, {
      // expires là key để set thời gian hết hạn cho cookie
      expires: new Date(Date.now() + expire)
    });  
  }

  next();
}
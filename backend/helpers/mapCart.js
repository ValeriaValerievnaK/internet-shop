module.exports = function (cart) {
  return {
    productId: cart.product_id,
    userId: cart.user_id,
    productImageUrl: cart.image,
    productTitle: cart.title,
    price: cart.price,
    count: cart.count,
    id: cart._id,
    totalCount: cart.total_count,
  };
};

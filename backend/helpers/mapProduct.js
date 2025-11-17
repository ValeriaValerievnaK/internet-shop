const mongoose = require("mongoose");
const mapComment = require("./mapComment");

module.exports = function (product) {
  return {
    id: product._id,
    title: product.title,
    imageUrl: product.image,
    category: product.category,
    price: product.price,
    count: product.count,
    comments: product.comments.map((comment) =>
      mongoose.isObjectIdOrHexString(comment) ? comment : mapComment(comment)
    ),
  };
};

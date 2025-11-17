const mongoose = require(`mongoose`);

const CartSchema = mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  title: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  price: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  total_count: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;

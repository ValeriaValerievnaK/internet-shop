const mongoose = require(`mongoose`);

const OrderSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      count: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;

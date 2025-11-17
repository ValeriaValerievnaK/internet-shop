const mongoose = require(`mongoose`);
const validator = require("validator");

const ProductSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
      message: "Изображение должно быть корректным URL",
    },
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
  },
  price: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;

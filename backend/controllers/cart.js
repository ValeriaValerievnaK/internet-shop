const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");

// add
// Сложная часть, поэтому оставлю комменарии

async function addProductToCart(productData) {
  const { product_id, user_id } = productData;

  const product = await Product.findById(product_id);

  if (!product) {
    throw new Error("Товар не найден");
  }

  // мы нашли товар и проверили есть ли он и есть ли он на складе

  if (product.count < 1) {
    throw new Error("Товара нет в наличии");
  }

  // проверяем лежит ли аналогичный товар в корзине у этого пользователя

  const existingCartItem = await Cart.findOne({
    product_id: product_id,
    user_id: user_id,
  });

  if (existingCartItem) {
    // если да, то количество на + 1
    const newCount = existingCartItem.count + 1;

    // проверяем, новое количество может ли быть добаленно и столько уже нет на сладе
    if (newCount > product.count) {
      throw new Error("Недостаточно товара на складе");
    }
    // обновляем количество и цену
    const newPrice =
      newCount * (existingCartItem.price / existingCartItem.count);

    const updatedCartItem = await Cart.findByIdAndUpdate(
      existingCartItem._id,
      {
        count: newCount,
        price: newPrice,
      },
      { returnDocument: "after" }
    );

    return updatedCartItem;
  } else {
    // если товара нет в корзине, то добавляем новый и проверяем лимит
    if (productData.count > product.count) {
      throw new Error("Недостаточно товара на складе");
    }

    // добавляем в корзину
    const newCartItem = await Cart.create({
      ...productData,
      count: 1,
      total_count: product.count,
    });

    return newCartItem;
  }
}

// edit (тут у меня проверка лимитов почти аналогична комментариям выше)

async function updateCartItem(id, updateData) {
  const cartItem = await Cart.findById(id);

  if (!cartItem) {
    throw new Error("Товар в корзине не найден");
  }

  const product = await Product.findById(cartItem.product_id);

  if (!product) {
    throw new Error("Товар не найден");
  }

  if (updateData.count !== undefined) {
    if (updateData.count > product.count) {
      throw new Error("Недостаточно товара на складе");
    }

    if (updateData.count < 1) {
      await Cart.findByIdAndDelete(id);
      return null;
    }
  }

  const updatedCartItem = await Cart.findByIdAndUpdate(id, updateData, {
    returnDocument: "after",
  });

  return updatedCartItem;
}

// delete

async function deleteCartItem(id) {
  return Cart.deleteOne({ _id: id });
}

// get

async function getCart(userId) {
  const cartItems = await Cart.find({ user_id: userId });
  return cartItems;
}

async function deleteCart(userId) {
  const result = await Cart.deleteMany({ user_id: userId });
  return result;
}

// создание заказа

async function createOrder(userId) {
  const cartItems = await Cart.find({ user_id: userId });

  if (cartItems.length === 0) {
    throw new Error("Корзина пуста");
  }

  await Order.create({
    user_id: userId,
    items: cartItems.map((item) => ({
      product_id: item.product_id,
      count: item.count,
    })),
  });

  for (const item of cartItems) {
    await Product.updateOne(
      { _id: item.product_id },
      { $inc: { count: -item.count } }
    );
  }

  await Product.deleteMany({ count: { $lte: 0 } });

  await Cart.deleteMany({ user_id: userId });
}

module.exports = {
  getCart,
  addProductToCart,
  updateCartItem,
  deleteCartItem,
  deleteCart,
  createOrder,
};

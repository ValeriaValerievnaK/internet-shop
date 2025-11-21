const express = require("express");
const {
  getCart,
  addProductToCart,
  updateCartItem,
  deleteCartItem,
  deleteCart,
} = require("../controllers/cart");
const authenticated = require("../middlewares/authenticated");
const mapCart = require("../helpers/mapCart");

const router = express.Router({ mergeParams: true });

router.get("/", authenticated, async (req, res) => {
  try {
    const cartItems = await getCart(req.user._id);
    res.send({ data: cartItems.map((product) => mapCart(product)) });
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.post("/", authenticated, async (req, res) => {
  try {
    const newCartItem = await addProductToCart({
      product_id: req.body.productId,
      user_id: req.body.userId,
      image: req.body.imageUrl,
      title: req.body.title,
      price: req.body.price,
    });

    res.send({ data: newCartItem });
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.delete("/", authenticated, async (req, res) => {
  try {
    await deleteCart(req.user._id);
    res.send({ error: null });
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.patch("/:id", authenticated, async (req, res) => {
  try {
    const updatedCartItem = await updateCartItem(req.params.id, {
      count: req.body.newCount,
      price: req.body.newPrice,
    });

    res.send({ data: mapCart(updatedCartItem) });
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.delete("/:id", authenticated, async (req, res) => {
  try {
    await deleteCartItem(req.params.id);
    res.send({ error: null });
  } catch (error) {
    res.send({ error: error.message });
  }
});

module.exports = router;

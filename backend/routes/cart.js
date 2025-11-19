const express = require("express");
const {
  getCart,
  addProductToCart,
  updateCartItem,
  deleteCartItem,
} = require("../controllers/cart");
const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const ROLES = require("../constants/roles");

const router = express.Router({ mergeParams: true });


router.get("/", authenticated, async (req, res) => {
  try {
   const cartItems = await getCart(req.query.userId);
    res.send({ data: cartItems });
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.post("/", authenticated, hasRole([ROLES.ADMIN, ROLES.BUYER]), async (req, res) => {
  try {
    const newCartItem = await addProductToCart({
      product_id: req.body.productId,
      user_id: req.body.userId,
      image_url: req.body.imageUrl,
      title: req.body.title,
      price: req.body.price,
      count: req.body.count || 1,
    });

    res.send({ data: newCartItem });
  } catch (error) {
    res.send({ error: error.message });
  }
});


router.patch("/:id", authenticated, hasRole([ROLES.ADMIN, ROLES.BUYER]), async (req, res) => {
  try {
    const updatedCartItem = await updateCartItem(req.params.id, {
      count: req.body.count,
      price: req.body.price,
    });

    res.send({ data: updatedCartItem });
  } catch (error) {
    res.send({ error: error.message });
  }
});


router.delete("/:id", authenticated, hasRole([ROLES.ADMIN, ROLES.BUYER]), async (req, res) => {
  try {
    await deleteCartItem(req.params.id);
    res.send({ error: null });
  } catch (error) {
    res.send({ error: error.message });
  }
});

module.exports = router;
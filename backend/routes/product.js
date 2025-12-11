const express = require("express");
const {
  addProduct,
  editProduct,
  deleteProduct,
  getProducts,
  getProduct,
  getCategories,
  getAllProducts,
} = require("../controllers/product");
const { addComment, deleteComment } = require("../controllers/comment");
const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const mapProduct = require("../helpers/mapProduct");
const mapComment = require("../helpers/mapComment");
const ROLES = require("../constants/roles");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const { products, lastPage } = await getProducts(
      req.query.search,
      req.query.limit,
      req.query.page,
      req.query.category,
      req.query.sort
    );

    res.send({ data: { lastPage, products: products.map(mapProduct) } });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.send({ data: products.map((product) => mapProduct(product)) });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/categories", async (req, res) => {
  try {
    const categories = await getCategories();
    res.send({ data: categories });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await getProduct(req.params.id);
    res.send({ data: mapProduct(product) });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

router.post("/:id/comments", authenticated, async (req, res) => {
  try {
    const newComment = await addComment(req.params.id, {
      content: req.body.content,
      author: req.user.id,
    });

    res.send({ data: mapComment(newComment) });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.delete(
  "/:productId/comments/:commentId",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    try {
      await deleteComment(req.params.productId, req.params.commentId);
      res.send({ error: null });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
);

router.post("/", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const newProduct = await addProduct({
      title: req.body.title,
      image: req.body.imageUrl,
      category: req.body.category,
      price: req.body.price,
      count: req.body.count,
    });

    res.send({ data: mapProduct(newProduct) });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.patch(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    try {
      const updatedProduct = await editProduct(req.params.id, {
        title: req.body.title,
        image: req.body.imageUrl,
        category: req.body.category,
        price: req.body.price,
        count: req.body.count,
      });

      res.send({ data: mapProduct(updatedProduct) });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
);

router.delete(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    try {
      await deleteProduct(req.params.id);

      res.send({ error: null });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
);

module.exports = router;

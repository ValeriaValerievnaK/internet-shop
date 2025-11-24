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
  const { products, lastPage } = await getProducts(
    req.query.search,
    req.query.limit,
    req.query.page,
    req.query.category,
    req.query.sort
  );

  res.send({ data: { lastPage, products: products.map(mapProduct) } });
});

router.get("/all", async (req, res) => {
  const products = await getAllProducts();

  res.send({ data: products.map((product) => mapProduct(product)) });
});

router.get("/categories", async (req, res) => {
  const categories = await getCategories();

  res.send({ data: categories });
});

router.get("/:id", async (req, res) => {
  const product = await getProduct(req.params.id);

  res.send({ data: mapProduct(product) });
});

router.post("/:id/comments", authenticated, async (req, res) => {
  const newComment = await addComment(req.params.id, {
    content: req.body.content,
    author: req.user.id,
  });

  res.send({ data: mapComment(newComment) });
});

router.delete(
  "/:productId/comments/:commentId",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    await deleteComment(req.params.productId, req.params.commentId);

    res.send({ error: null });
  }
);

router.post("/", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  const newProduct = await addProduct({
    title: req.body.title,
    image: req.body.imageUrl,
    category: req.body.category,
    price: req.body.price,
    count: req.body.count,
  });

  res.send({ data: mapProduct(newProduct) });
});

router.patch(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    const updatedProduct = await editProduct(req.params.id, {
      title: req.body.title,
      image: req.body.imageUrl,
      category: req.body.category,
      price: req.body.price,
      count: req.body.count,
    });

    res.send({ data: mapProduct(updatedProduct) });
  }
);

router.delete(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    await deleteProduct(req.params.id);

    res.send({ error: null });
  }
);

module.exports = router;

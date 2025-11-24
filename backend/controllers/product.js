const categories = require("../constants/categories");
const Product = require("../models/Product");

// add
async function addProduct(product) {
  const newProduct = await Product.create(product);

  await newProduct.populate({
    path: "comments",
    populate: "author",
  });

  return newProduct;
}

// edit
async function editProduct(id, product) {
  const newProduct = await Product.findByIdAndUpdate(id, product, {
    returnDocument: "after",
  });

  await newProduct.populate({
    path: "comments",
    populate: "author",
  });

  return newProduct;
}

// delete

async function deleteProduct(id) {
  return Product.deleteOne({ _id: id });
}

// get list with search and pagination

async function getProducts(
  search = "",
  limit = 10,
  page = 1,
  category = "",
  sort = "asc"
) {
  const filter = {
    title: { $regex: search, $options: "i" },
  };

  if (category && category.trim() !== "") {
    filter.category = category;
  }

  const sortOrder = sort === "desc" ? -1 : 1;

  const [products, count] = await Promise.all([
    Product.find(filter)
      .sort({ price: sortOrder })
      .limit(limit)
      .skip((page - 1) * limit),
    Product.countDocuments(filter),
  ]);

  return { products, lastPage: Math.ceil(count / limit) };
}

function getAllProducts() {
  return Product.find().populate({
    path: "comments",
    populate: "author",
  });
}

// get item

async function getProduct(id) {
  return Product.findById(id).populate({
    path: "comments",
    populate: "author",
  });
}

// get Categories

function getCategories() {
  return categories;
}

module.exports = {
  addProduct,
  editProduct,
  deleteProduct,
  getAllProducts,
  getProducts,
  getProduct,
  getCategories,
};

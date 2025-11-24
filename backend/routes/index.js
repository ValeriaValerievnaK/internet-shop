const express = require("express");

const router = express.Router({ mergeParams: true });

router.use("/", require("./auth"));
router.use("/products", require("./product"));
router.use("/cart", require("./cart"));

module.exports = router;

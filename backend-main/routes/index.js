const express = require("express");
const router = express();

const products = require('./product')
const category = require('./category')
const review = require('./review')

router.use("/product", products);
router.use("/category", category);
router.use("/review", review);

module.exports = router;

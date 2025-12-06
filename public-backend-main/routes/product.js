const express = require("express");
const router = express.Router();

const {
    getAll,
    read
} = require('../controllers/product');

router.get("/", getAll);
router.get("/read/:slug", read);

module.exports = router;

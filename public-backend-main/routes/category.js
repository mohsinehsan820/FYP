const express = require("express");
const router = express.Router();

const {
    getAll,
    read
} = require('../controllers/category');

router.get("/read/:slug", read);
router.get("/", getAll);

module.exports = router;

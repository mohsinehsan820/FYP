const express = require("express");
const router = express();

const {
    register,
    login,
    getAll,
    deleteUser
} = require('../controllers/user')

router.post("/register", register)
router.post("/login", login)
router.get("/", getAll)
router.delete("/:id", deleteUser)

module.exports = router;

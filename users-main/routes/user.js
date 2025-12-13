const express = require("express");
const router = express();
const auth = require('../middleware/auth');

const {
    register,
    login,
    getAll,
    deleteUser
} = require('../controllers/user')

router.post("/register", register)
router.post("/login", login)
router.get("/", getAll)
router.get("/validate", auth, (req, res) => {
    // If auth middleware passes, token is valid
    res.status(200).json({
        success: true,
        msg: "Token is valid",
        user: req.user
    });
})
router.delete("/:id", deleteUser)

module.exports = router;

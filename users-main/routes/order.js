const express = require("express");
const router = express();
const middleware = require('../middleware/auth')

const {
    create,
    cancel,
    all,
    read,
    getAllOrdersAdmin,
    updateStatus,
    updatePaymentStatus
} = require('../controllers/order')

router.post("/create", middleware, create)
router.delete("/cancel/:id", middleware, cancel)
router.get("/", middleware, all)
router.get("/read/:id", middleware, read)
router.get("/admin/all", getAllOrdersAdmin)
router.put("/status/:id", updateStatus)
router.put("/payment-status/:id", updatePaymentStatus)

module.exports = router;

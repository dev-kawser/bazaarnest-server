const express = require("express");
const { postOrder, getOrdersByEmail, getAllOrders, updateOrderStatus } = require("../controllers/ordersControllers");
const router = express.Router();

router.post('/', postOrder);
router.get('/', getAllOrders)
router.get('/:email', getOrdersByEmail)
router.patch("/status", updateOrderStatus);

module.exports = router;
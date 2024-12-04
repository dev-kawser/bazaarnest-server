const express = require("express");
const { postOrder, getOrdersByEmail, getAllOrders } = require("../controllers/ordersControllers");
const router = express.Router();

router.post('/', postOrder);
router.get('/', getAllOrders)
router.get('/:email', getOrdersByEmail)

module.exports = router;
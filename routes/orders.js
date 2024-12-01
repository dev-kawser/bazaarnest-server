const express = require("express");
const { postOrder, getOrdersByEmail } = require("../controllers/ordersControllers");
const router = express.Router();

router.post('/', postOrder);
router.get('/:email', getOrdersByEmail)

module.exports = router;
const express = require("express");
const { postOrder } = require("../controllers/ordersControllers");
const router = express.Router();

router.post('/', postOrder);

module.exports = router;
const express = require("express");
const { addCart, getCartsByUserEmail } = require("../controllers/cartsControllers");
const router = express.Router();

router.post('/', addCart);
router.get('/:email', getCartsByUserEmail)

module.exports = router;
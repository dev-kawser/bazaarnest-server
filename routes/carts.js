const express = require("express");
const { addCart, getCartsByUserEmail, deleteCartsByUserEmail, updateCartQuantity } = require("../controllers/cartsControllers");
const router = express.Router();

router.post('/', addCart);
router.get('/:email', getCartsByUserEmail);
router.delete('/delete/:email', deleteCartsByUserEmail);
router.patch('/:cartId', updateCartQuantity);

module.exports = router;
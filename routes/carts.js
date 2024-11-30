const express = require("express");
const { addCart, getCartsByUserEmail, deleteCartsByUserEmail } = require("../controllers/cartsControllers");
const router = express.Router();

router.post('/', addCart);
router.get('/:email', getCartsByUserEmail);
router.delete('/delete/:email', deleteCartsByUserEmail);

module.exports = router;
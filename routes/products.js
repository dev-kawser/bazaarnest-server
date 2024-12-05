const express = require("express");
const { getAllProducts, getProductById, addProduct } = require("../controllers/productsControllers");
const router = express.Router();

router.post('/', addProduct)
router.get('/', getAllProducts);
router.get('/:id', getProductById);

module.exports = router;
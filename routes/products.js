const express = require("express");
const { getAllProducts, getProductById, addProduct, updateProductById } = require("../controllers/productsControllers");
const router = express.Router();

router.post('/', addProduct)
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.patch('/update/:id', updateProductById);

module.exports = router;
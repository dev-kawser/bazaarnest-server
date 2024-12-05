const express = require("express");
const { getAllOfferProducts, getOfferProductById, addOfferProduct } = require("../controllers/offerProductsControllers");
const router = express.Router();

router.post('/', addOfferProduct)
router.get('/', getAllOfferProducts);
router.get('/:id', getOfferProductById);


module.exports = router;
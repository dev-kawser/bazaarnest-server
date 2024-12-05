const express = require("express");
const { getAllOfferProducts, getOfferProductById, addOfferProduct, deleteOfferProductById } = require("../controllers/offerProductsControllers");
const router = express.Router();

router.post('/', addOfferProduct)
router.get('/', getAllOfferProducts);
router.get('/:id', getOfferProductById);
router.delete('/delete/:id', deleteOfferProductById);

module.exports = router;
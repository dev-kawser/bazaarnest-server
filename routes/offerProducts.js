const express = require("express");
const { getAllOfferProducts, getOfferProductById, addOfferProduct, deleteOfferProductById, updateOfferProductById } = require("../controllers/offerProductsControllers");
const router = express.Router();

router.post('/', addOfferProduct)
router.get('/', getAllOfferProducts);
router.get('/:id', getOfferProductById);
router.delete('/delete/:id', deleteOfferProductById);
router.patch('/update/:id', updateOfferProductById);

module.exports = router;
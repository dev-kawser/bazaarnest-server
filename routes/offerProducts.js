const express = require("express");
const { getAllOfferProducts, getOfferProductById } = require("../controllers/offerProductsControllers");
const router = express.Router();

router.get('/', getAllOfferProducts);
router.get('/:id', getOfferProductById);


module.exports = router;
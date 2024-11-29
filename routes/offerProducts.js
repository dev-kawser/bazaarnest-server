const express = require("express");
const { getAllOfferProducts } = require("../controllers/offerProductsControllers");
const router = express.Router();

router.get('/', getAllOfferProducts);


module.exports = router;